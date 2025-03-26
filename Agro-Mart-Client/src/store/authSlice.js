import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../firebase/firebase.init";
import axios from "axios";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const provider = new GoogleAuthProvider();
const API_URL = import.meta.env.VITE_API_URL;

// Configuration
const MAX_ATTEMPTS = 3;
const LOCK_DURATION = 1 * 60 * 1000; // 5 minutes

// Token management
const storeToken = (token) => localStorage.setItem("accessToken", token);
const removeToken = () => localStorage.removeItem("accessToken");

const fetchToken = async (email) => {
  try {
    const { data } = await axios.post(`${API_URL}/jwt`, { email });
    storeToken(data.token);
    return data.token;
  } catch (error) {
    console.error("Error fetching token:", error);
    throw error;
  }
};

export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async ({ email, password, name, photo }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });

      const token = await fetchToken(email);
      return { user: { ...user, displayName: name, photoURL: photo } };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signInUser = createAsyncThunk(
  "auth/signInUser",
  async ({ email, password }, { rejectWithValue }) => {
    const normalizedEmail = email.toLowerCase();

    try {
      // First check if account is locked and if the lock has expired
      const userRef = doc(db, "failedLogins", normalizedEmail);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const { lockedUntil } = userDoc.data();
        // If account is currently locked
        if (lockedUntil && Date.now() < lockedUntil) {
          const remainingTime = Math.ceil(
            (lockedUntil - Date.now()) / (60 * 1000)
          );
          return rejectWithValue(
            `Account locked. Try again in ${remainingTime} minute(s).`
          );
        }
        // If lock has expired, reset the attempts
        else if (lockedUntil) {
          await setDoc(
            userRef,
            {
              attempts: 0,
              lockedUntil: null,
              lastAttempt: null,
            },
            { merge: true }
          );
        }
      }

      // Proceed with normal login
      const userCredential = await signInWithEmailAndPassword(
        auth,
        normalizedEmail,
        password
      );

      // Reset attempts on successful login
      await setDoc(
        userRef,
        {
          attempts: 0,
          lockedUntil: null,
          lastAttempt: null,
        },
        { merge: true }
      );

      return { user: userCredential.user };
    } catch (authError) {
      // Handle failed login attempt
      let errorMessage = "Login failed";

      try {
        const userRef = doc(db, "failedLogins", normalizedEmail);
        const userDoc = await getDoc(userRef);
        const userData = userDoc.exists() ? userDoc.data() : {};
        const attempts = userData.attempts ? userData.attempts + 1 : 1;

        if (attempts >= MAX_ATTEMPTS) {
          await setDoc(
            userRef,
            {
              attempts,
              lockedUntil: Date.now() + LOCK_DURATION,
              lastAttempt: new Date().toISOString(),
            },
            { merge: true }
          );
          errorMessage = `Too many failed attempts. Account locked for ${
            LOCK_DURATION / (60 * 1000)
          } minutes.`;
        } else {
          await setDoc(
            userRef,
            {
              attempts,
              lockedUntil: null,
              lastAttempt: new Date().toISOString(),
            },
            { merge: true }
          );
          errorMessage = `Invalid email or password. Attempt ${attempts} of ${MAX_ATTEMPTS}.`;
        }
      } catch (firestoreError) {
        console.log("Account lockout service unavailable:", firestoreError);
        errorMessage = "Invalid email or password. System features limited.";
      }

      return rejectWithValue(errorMessage);
    }
  }
);

//google login
export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async (_, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      await fetchToken(user.email);
      return { user };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk(
  "auth/logOut",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      removeToken();
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async ({ name, photo }, { rejectWithValue }) => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });
      return { displayName: name, photoURL: photo };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const InitializeAuthListener = createAsyncThunk(
  "auth/InitializeAuthListener",
  async (_, { dispatch }) => {
    return new Promise((resolve) => {
      const unSub = onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          await currentUser.reload();
          const token = localStorage.getItem("accessToken");
          if (!token) await fetchToken(currentUser.email);
          dispatch(setUser({ user: currentUser }));
        } else {
          dispatch(setUser(null));
        }
        dispatch(setLoading(false));
        resolve();
      });
      return () => unSub();
    });
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: true,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        if (state.user) {
          state.user.user = {
            ...state.user.user,
            displayName: action.payload.displayName,
            photoURL: action.payload.photoURL,
          };
        }
      })
      .addCase(InitializeAuthListener.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { setUser, setLoading, clearError } = authSlice.actions;
export default authSlice.reducer;

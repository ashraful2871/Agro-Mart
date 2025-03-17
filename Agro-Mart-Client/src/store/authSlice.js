import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.init";

const provider = new GoogleAuthProvider();

//async thunks for authentication

//sign up user
export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.massage);
    }
  }
);

// sign in user
export const signInUser = createAsyncThunk(
  "auth/signInUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      return rejectWithValue(error.massage);
    }
  }
);
//google login
export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async (_, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithPopup(auth, provider);
      return userCredential.user;
    } catch (error) {
      return rejectWithValue(error.massage);
    }
  }
);

//update profile
export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async ({ name, photo }, { rejectWithValue }) => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });
      return {
        displayName: name,
        photoURL: photo,
      };
    } catch (error) {
      return rejectWithValue(error.massage);
    }
  }
);

///async thunk observer

export const InitializeAuthListener = createAsyncThunk(
  "auth/InitializeAuthListener",
  async (_, { dispatch }) => {
    return new Promise((resolve) => {
      const unSub = onAuthStateChanged(auth, (currentUser) => {
        dispatch(setUser(currentUser));
        console.log(currentUser);
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(InitializeAuthListener.fulfilled, (state) => {
        state.loading = false;
      });
  },
});

export const { setUser, setLoading } = authSlice.actions;
export default authSlice.reducer;

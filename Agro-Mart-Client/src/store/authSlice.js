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
import { auth } from "../firebase/firebase.init";
import axios from "axios";
import { useDispatch } from "react-redux";

const provider = new GoogleAuthProvider();
const API_URL = import.meta.env.VITE_API_URL;
//store and retrieve jwt token
const storeToken = (token) => localStorage.setItem("accessToken", token);
const removeToken = () => localStorage.removeItem("accessToken");
// const dispatch = useDispatch();

//async thunks to get jwt token from backend
const fetchToken = async (email) => {
  try {
    const { data } = await axios.post(`${API_URL}/jwt`, { email });
    storeToken(data.token);
    return data.token;
  } catch (error) {
    console.log("error fetching token", error);
  }
};
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
      const user = userCredential.user;
      const token = await fetchToken(email);
      // dispatch(setUser(user));
      return { user, token };
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
      const user = userCredential.user;
      const token = await fetchToken(email);
      // dispatch(setUser(user));
      return { user, token };
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
      const user = userCredential.user;
      const token = await fetchToken(user.email);
      // dispatch(setUser(user));
      return { user, token };
    } catch (error) {
      return rejectWithValue(error.massage);
    }
  }
);
//google login
export const logOut = createAsyncThunk(
  "auth/logOut",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      removeToken();
      return null;
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
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { setUser, setLoading } = authSlice.actions;
export default authSlice.reducer;

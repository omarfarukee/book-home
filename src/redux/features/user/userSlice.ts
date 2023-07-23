/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { auth } from "../../../firebase/Firebase";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

interface IUser {
  user: {
    email: string | null;
  };
  isLoading: boolean;
  isSuccess: boolean;
  isError: string | null;
}

interface ICredential {
  email: string;
  password: string;
}

const initialState: IUser = {
  user: {
    email: null,
  },
  isLoading: false,
  isSuccess: false,
  isError: null,
};

export const createUser = createAsyncThunk(
  "user/createUser",
  async ({ email, password }: ICredential) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    return data.user.email;
  }
);
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }: ICredential) => {
    const data = await signInWithEmailAndPassword(auth, email, password);

    return data.user.email;
  }
);
const googleProvider = new GoogleAuthProvider();
export const signUpWithGoogle = createAsyncThunk(
  "user/signUpWithGoogle",
  async () => {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user.email;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user.email = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state: any) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.user.email = action.payload;
        state.isLoading = false;
      })
      .addCase(createUser.rejected, (state: any, action) => {
        state.user.email = null;
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state: any) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user.email = action.payload;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state: any, action) => {
        state.user.email = null;
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      });

    builder.addCase(signUpWithGoogle.pending, (state: any) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });

    builder.addCase(signUpWithGoogle.fulfilled, (state, action) => {
      state.user.email = action.payload;
      state.isLoading = false;
    });

    builder.addCase(signUpWithGoogle.rejected, (state: any, action) => {
      state.user.email = null;
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message;
    });
  },
});

export const { setUser, setLoading } = userSlice.actions;

export default userSlice.reducer;

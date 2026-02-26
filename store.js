import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser } from "./authService";

/* =========================
   ASYNC LOGIN THUNK
========================= */
export const loginThunk = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await loginUser(credentials);
      return data;
    } catch (err) {
      // safer error extraction
      return rejectWithValue(
        err?.response?.data?.message ||
        err?.message ||
        "Login failed"
      );
    }
  }
);

/* =========================
   INITIAL STATE
========================= */
const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false
};

/* =========================
   SLICE
========================= */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /* 🔥 LOGOUT (production safe) */
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      /* pending */
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      /* success */
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })

      /* failed */
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
        state.isAuthenticated = false;
      });
  }
});

/* =========================
   EXPORTS
========================= */
export const { logout } = authSlice.actions;
export default authSlice.reducer;
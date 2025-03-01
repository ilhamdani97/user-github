/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface GitHubState {
  users: any[];
  repos: any[];
  loadingUser: boolean;
  loadingRepo: boolean;
  error: string | null;
}

// Initial state
const initialState: GitHubState = {
  users: [],
  repos: [],
  loadingUser: false,
  loadingRepo: false,
  error: null,
};

// Async thunk for searching users
export const fetchUsers = createAsyncThunk(
  "github/fetchUsers",
  async (searchTerm: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.github.com/search/users?q=${searchTerm}&per_page=5`
      );
      return response.data.items;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch users");
    }
  }
);

// Async thunk for fetching repositories
export const fetchRepos = createAsyncThunk(
  "github/fetchRepos",
  async (username: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}/repos`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch repositories");
    }
  }
);

// Create the slice
const githubSlice = createSlice({
  name: "github",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loadingUser = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loadingUser = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loadingUser = false;
        state.error = action.payload as string;
      })
      .addCase(fetchRepos.pending, (state) => {
        state.loadingRepo = true;
        state.error = null;
      })
      .addCase(fetchRepos.fulfilled, (state, action) => {
        state.loadingRepo = false;
        state.repos = action.payload;
      })
      .addCase(fetchRepos.rejected, (state, action) => {
        state.loadingRepo = false;
        state.error = action.payload as string;
      });
  },
});

export default githubSlice.reducer;

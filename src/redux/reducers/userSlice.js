import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
    teachers: [],
};

const BASE_URL = 'https://code8hackathon.duckdns.org/api';

// Utility to extract error messages
const getErrorMessage = (error) => {
    if (axios.isAxiosError(error)) {
        return error.response?.data?.message || error.message || 'Something went wrong';
    }
    return 'Unexpected error';
};

// Check current user (me endpoint)
export const checkAuth = createAsyncThunk(
    'Auth/checkAuth',
    async (_, thunkAPI) => {
        try {
            const res = await axios.get(`${BASE_URL}/Auth/me`, { withCredentials: true });
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(getErrorMessage(err));
        }
    }
);

// Signup
export const signup = createAsyncThunk(
    'Auth/signup',
    async (data, thunkAPI) => {
        try {
            const res = await axios.post(`${BASE_URL}/Auth/register`, data, { withCredentials: true });
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(getErrorMessage(err));
        }
    }
);

// Login
export const login = createAsyncThunk(
    'Auth/login',
    async (data, thunkAPI) => {
        try {
            const res = await axios.post(`${BASE_URL}/Auth/login`, data, { withCredentials: true });
            console.log('Login response:', res.data); // Debug log
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(getErrorMessage(err));
        }
    }
);

// Logout
export const logout = createAsyncThunk(
    'Auth/logout',
    async (_, thunkAPI) => {
        try {
            await axios.post(`${BASE_URL}/Auth/logout`, {}, { withCredentials: true });
        } catch (err) {
            return thunkAPI.rejectWithValue(getErrorMessage(err));
        }
    }
);

// Get All Teachers
export const getAllTeachers = createAsyncThunk(
    'Auth/getAllTeachers',
    async (_, thunkAPI) => {
        try {
            const res = await axios.get(`${BASE_URL}/teacher/all`, {withCredentials: true});
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(getErrorMessage(err));
        }
    }
);

// Send OTP
export const sendOTP = createAsyncThunk(
    'Auth/sendOTP',
    async (email, thunkAPI) => {
        try {
            const res = await axios.post(`${BASE_URL}/Auth/send-otp`, { email });
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(getErrorMessage(err));
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetAuthError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Check Auth (me endpoint)
            .addCase(checkAuth.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
                console.log('Auth check successful, user:', state.user); // Debug log
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'Auth check failed';
                state.isAuthenticated = false;
                state.user = null;
            })

            // Signup
            .addCase(signup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false;
                // Check if response has nested user object or direct user data
                state.user = action.payload.user || action.payload;
                state.isAuthenticated = true;
                console.log('Signup successful, user:', state.user); // Debug log
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'Signup failed';
            })

            // Login - FIXED
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                // Since your backend returns user data directly, not nested under 'user'
                // Backend response: {"$id":"1","name":"Admin","role":"Admin"}
                state.user = action.payload;
                state.isAuthenticated = true;
                console.log('Login successful, user stored:', state.user); // Debug log
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'Login failed';
                state.isAuthenticated = false;
                state.user = null;
            })

            // Logout
            .addCase(logout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
                console.log('Logout successful'); // Debug log
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'Logout failed';
            })

            // Send OTP
            .addCase(sendOTP.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendOTP.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(sendOTP.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'OTP failed';
            })

            // Get All Teachers
            .addCase(getAllTeachers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllTeachers.fulfilled, (state, action) => {
                state.loading = false;
                state.teachers = action.payload;
            })
            .addCase(getAllTeachers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'Failed to fetch teachers';
            });
    },
});

export const { resetAuthError } = authSlice.actions;
export default authSlice.reducer;
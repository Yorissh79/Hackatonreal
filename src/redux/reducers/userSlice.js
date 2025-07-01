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

// Signup
export const signup = createAsyncThunk(
    'Auth/signup',
    async (data, thunkAPI) => {
        try {
            const res = await axios.post(`${BASE_URL}/auth/signup`, data, { withCredentials: true });
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
            const res = await axios.post(`${BASE_URL}/auth/login`, data, { withCredentials: true });
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
            await axios.post(`${BASE_URL}/auth/logout`, {}, { withCredentials: true });
        } catch (err) {
            return thunkAPI.rejectWithValue(getErrorMessage(err));
        }
    }
);

// Get All Teachers
export const getAllTeachers = createAsyncThunk(
    'auth/getAllTeachers',
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
    'auth/sendOTP',
    async (email, thunkAPI) => {
        try {
            const res = await axios.post(`${BASE_URL}/auth/send-otp`, { email });
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(getErrorMessage(err));
        }
    }
);

// ---------------------- Slice ----------------------

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
            // Signup
            .addCase(signup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'Signup failed';
            })

            // Login
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'Login failed';
            })

            // Logout
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(logout.rejected, (state, action) => {
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
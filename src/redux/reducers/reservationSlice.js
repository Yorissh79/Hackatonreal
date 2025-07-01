import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    reservations: [],
    tableData: [],
    currentReservation: null,
    loading: false,
    error: null,
};

const BASE_URL = 'https://code8hackathon.duckdns.org/api';

// Utility to extract error messages
const getErrorMessage = (error) => {
    if (axios.isAxiosError(error)) {
        return error.response?.data?.message || error.message || 'Something went wrong';
    }
    return 'Unexpected error';
};

// Get all reservations
export const getReservationList = createAsyncThunk(
    'reservation/getList',
    async (_, thunkAPI) => {
        try {
            const res = await axios.get(`${BASE_URL}/Reservation/list`, { withCredentials: true });
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(getErrorMessage(err));
        }
    }
);

// Get reservation table data
export const getReservationTable = createAsyncThunk(
    'reservation/getTable',
    async (_, thunkAPI) => {
        try {
            const res = await axios.get(`${BASE_URL}/Reservation/table`, { withCredentials: true });
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(getErrorMessage(err));
        }
    }
);

// Create new reservation
export const createReservation = createAsyncThunk(
    'reservation/create',
    async (reservationData, thunkAPI) => {
        try {
            const res = await axios.post(`${BASE_URL}/Reservation/createReservation`, reservationData, { withCredentials: true });
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(getErrorMessage(err));
        }
    }
);

// Update reservation
export const updateReservation = createAsyncThunk(
    'reservation/update',
    async (reservationData, thunkAPI) => {
        try {
            const res = await axios.put(`${BASE_URL}/Reservation/update`, reservationData, { withCredentials: true });
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(getErrorMessage(err));
        }
    }
);

// Get reservation by ID
export const getReservationById = createAsyncThunk(
    'reservation/getById',
    async (id, thunkAPI) => {
        try {
            const res = await axios.get(`${BASE_URL}/Reservation/update/${id}`, { withCredentials: true });
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(getErrorMessage(err));
        }
    }
);

// Delete reservation
export const deleteReservation = createAsyncThunk(
    'reservation/delete',
    async (id, thunkAPI) => {
        try {
            await axios.delete(`${BASE_URL}/Reservation/delete/${id}`, { withCredentials: true });
            return id; // Return the deleted ID for state update
        } catch (err) {
            return thunkAPI.rejectWithValue(getErrorMessage(err));
        }
    }
);

const reservationSlice = createSlice({
    name: 'reservation',
    initialState,
    reducers: {
        resetReservationError: (state) => {
            state.error = null;
        },
        clearCurrentReservation: (state) => {
            state.currentReservation = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Get reservation list
            .addCase(getReservationList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getReservationList.fulfilled, (state, action) => {
                state.loading = false;
                state.reservations = action.payload;
            })
            .addCase(getReservationList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'Failed to fetch reservations';
            })

            // Get reservation table
            .addCase(getReservationTable.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getReservationTable.fulfilled, (state, action) => {
                state.loading = false;
                state.tableData = action.payload;
            })
            .addCase(getReservationTable.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'Failed to fetch table data';
            })

            // Create reservation
            .addCase(createReservation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createReservation.fulfilled, (state, action) => {
                state.loading = false;
                // Add new reservation to the list
                state.reservations.push(action.payload);
                console.log('Reservation created successfully:', action.payload);
            })
            .addCase(createReservation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'Failed to create reservation';
            })

            // Update reservation
            .addCase(updateReservation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateReservation.fulfilled, (state, action) => {
                state.loading = false;
                // Update the reservation in the list
                const index = state.reservations.findIndex(
                    (reservation) => reservation.id === action.payload.id
                );
                if (index !== -1) {
                    state.reservations[index] = action.payload;
                }
                state.currentReservation = action.payload;
                console.log('Reservation updated successfully:', action.payload);
            })
            .addCase(updateReservation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'Failed to update reservation';
            })

            // Get reservation by ID
            .addCase(getReservationById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getReservationById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentReservation = action.payload;
            })
            .addCase(getReservationById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'Failed to fetch reservation';
            })

            // Delete reservation
            .addCase(deleteReservation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteReservation.fulfilled, (state, action) => {
                state.loading = false;
                // Remove the deleted reservation from the list
                state.reservations = state.reservations.filter(
                    (reservation) => reservation.id !== action.payload
                );
                console.log('Reservation deleted successfully, ID:', action.payload);
            })
            .addCase(deleteReservation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'Failed to delete reservation';
            });
    },
});

export const { resetReservationError, clearCurrentReservation } = reservationSlice.actions;
export default reservationSlice.reducer;
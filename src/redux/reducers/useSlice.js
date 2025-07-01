// userSlice.js (Example using Redux Toolkit slice concept)

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async Thunks for API calls (assuming a userAPI service)
export const fetchUserForUpdate = createAsyncThunk(
    'user/fetchUserForUpdate',
    async (email, { rejectWithValue }) => {
        try {
            // Assuming 'userAPI' is an instance of your API client
            const response = await userAPI.getUserForUpdate(email);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchUsersTable = createAsyncThunk(
    'user/fetchUsersTable',
    async (_, { rejectWithValue }) => {
        try {
            const response = await userAPI.getUsersTable();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchUsersList = createAsyncThunk(
    'user/fetchUsersList',
    async (_, { rejectWithValue }) => {
        try {
            const response = await userAPI.getUsersList();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const addUser = createAsyncThunk(
    'user/addUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await userAPI.addUser(userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await userAPI.updateUser(userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteUser = createAsyncThunk(
    'user/deleteUser',
    async (email, { rejectWithValue }) => {
        try {
            const response = await userAPI.deleteUser(email);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        usersTableData: [],
        usersListData: [],
        currentUser: null,
        loading: false,
        error: null,
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    },
    reducers: {
        // Synchronous reducers can go here if needed, e.g., to clear user data
        clearCurrentUser: (state) => {
            state.currentUser = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // fetchUserForUpdate
            .addCase(fetchUserForUpdate.pending, (state) => {
                state.status = 'loading';
                state.loading = true;
            })
            .addCase(fetchUserForUpdate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.loading = false;
                state.currentUser = action.payload;
                state.error = null;
            })
            .addCase(fetchUserForUpdate.rejected, (state, action) => {
                state.status = 'failed';
                state.loading = false;
                state.error = action.payload;
            })
            // fetchUsersTable
            .addCase(fetchUsersTable.pending, (state) => {
                state.status = 'loading';
                state.loading = true;
            })
            .addCase(fetchUsersTable.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.loading = false;
                state.usersTableData = action.payload;
                state.error = null;
            })
            .addCase(fetchUsersTable.rejected, (state, action) => {
                state.status = 'failed';
                state.loading = false;
                state.error = action.payload;
            })
            // fetchUsersList
            .addCase(fetchUsersList.pending, (state) => {
                state.status = 'loading';
                state.loading = true;
            })
            .addCase(fetchUsersList.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.loading = false;
                state.usersListData = action.payload;
                state.error = null;
            })
            .addCase(fetchUsersList.rejected, (state, action) => {
                state.status = 'failed';
                state.loading = false;
                state.error = action.payload;
            })
            // addUser
            .addCase(addUser.pending, (state) => {
                state.status = 'loading';
                state.loading = true;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.loading = false;
                // Optionally update the lists if the added user should appear immediately
                state.usersListData.push(action.payload); // Example: assuming payload is the new user
                state.usersTableData.push(action.payload); // Example
                state.error = null;
            })
            .addCase(addUser.rejected, (state, action) => {
                state.status = 'failed';
                state.loading = false;
                state.error = action.payload;
            })
            // updateUser
            .addCase(updateUser.pending, (state) => {
                state.status = 'loading';
                state.loading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.loading = false;
                // Update the specific user in the lists
                const updatedUser = action.payload;
                if (state.currentUser && state.currentUser.email === updatedUser.email) {
                    state.currentUser = updatedUser;
                }
                state.usersListData = state.usersListData.map(user =>
                    user.email === updatedUser.email ? updatedUser : user
                );
                state.usersTableData = state.usersTableData.map(user =>
                    user.email === updatedUser.email ? updatedUser : user
                );
                state.error = null;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.status = 'failed';
                state.loading = false;
                state.error = action.payload;
            })
            // deleteUser
            .addCase(deleteUser.pending, (state) => {
                state.status = 'loading';
                state.loading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.loading = false;
                // Remove the deleted user from the lists
                const deletedEmail = action.meta.arg; // The email passed to the thunk
                state.usersListData = state.usersListData.filter(user => user.email !== deletedEmail);
                state.usersTableData = state.usersTableData.filter(user => user.email !== deletedEmail);
                if (state.currentUser && state.currentUser.email === deletedEmail) {
                    state.currentUser = null;
                }
                state.error = null;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.status = 'failed';
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearCurrentUser } = userSlice.actions;

export default userSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://Myapi.com/api";

// Hata mesajı almak için yardımcı fonksiyon
const getErrorMessage = (error) => {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
  return "Unexpected error";
};

// Odaları listele (GET /api/Room/table)
export const fetchRooms = createAsyncThunk(
  "room/fetchRooms",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/Room/table`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

// Oda ekle (POST /api/Room/add)
export const addRoom = createAsyncThunk(
  "room/addRoom",
  async (roomData, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/Room/add`, roomData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

// Oda güncelle (PUT /api/Room/update)
export const updateRoom = createAsyncThunk(
  "room/updateRoom",
  async (roomData, thunkAPI) => {
    try {
      const response = await axios.put(`${BASE_URL}/Room/update`, roomData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

// Oda durumu değiştir (PATCH /api/Room/change-status/{id})
export const changeRoomStatus = createAsyncThunk(
  "room/changeRoomStatus",
  async ({ id, statusData }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/Room/change-status/${id}`,
        statusData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

// Oda sil (DELETE /api/Room/delete/{id})
export const deleteRoom = createAsyncThunk(
  "room/deleteRoom",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${BASE_URL}/Room/delete/${id}`);
      return id; // silinen oda id'sini döner
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

// Oda detaylarını getirme (GET /api/Room/update/{id})
export const fetchRoomById = createAsyncThunk(
  "room/fetchRoomById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/Room/update/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

const initialState = {
  rooms: [],
  currentRoom: null,
  loading: false,
  error: null,
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    clearCurrentRoom: (state) => {
      state.currentRoom = null;
      state.error = null;
    },
    clearRoomError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchRooms
      .addCase(fetchRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = action.payload;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // addRoom
      .addCase(addRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms.push(action.payload);
      })
      .addCase(addRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // updateRoom
      .addCase(updateRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRoom.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.rooms.findIndex((r) => r.id === action.payload.id);
        if (index !== -1) {
          state.rooms[index] = action.payload;
        }
      })
      .addCase(updateRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // changeRoomStatus
      .addCase(changeRoomStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeRoomStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedRoom = action.payload;
        const index = state.rooms.findIndex((r) => r.id === updatedRoom.id);
        if (index !== -1) {
          state.rooms[index] = updatedRoom;
        }
      })
      .addCase(changeRoomStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // deleteRoom
      .addCase(deleteRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = state.rooms.filter((r) => r.id !== action.payload);
      })
      .addCase(deleteRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetchRoomById
      .addCase(fetchRoomById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoomById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentRoom = action.payload;
      })
      .addCase(fetchRoomById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentRoom, clearRoomError } = roomSlice.actions;
export default roomSlice.reducer;

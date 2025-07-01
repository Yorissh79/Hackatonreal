import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./reducers/userSlice.js";
import roomSlice from "./reducers/roomSlice.js";
import useSlice from "./reducers/useSlice.js";
import reservationSlice from "./reducers/reservationSlice.js";

export const store = configureStore({
    reducer: {
        userSlice: userSlice,
        roomSlice: roomSlice,
        useSlice: useSlice,
        reservationSlice: reservationSlice,
    },
})
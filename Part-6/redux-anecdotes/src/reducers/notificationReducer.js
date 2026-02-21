import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "Render here notification...",
  reducers: {
    createDisplayNotification(state, action) {
      return action.payload;
    },
    clearNotification() {
      return "";
    },
  },
});

export const { createDisplayNotification, clearNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { getOrSaveFromStorage } from "../../lib/features";
import { NEW_MESSAGE_ALERT } from "../../constants/events";

const initialState = {
  notificationCount: 0,
  newMessagesAlert: getOrSaveFromStorage({
    key: NEW_MESSAGE_ALERT,
    get: true,
  }) || [
    {
      chatId: "",
      count: 0,
    },
  ],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    incrementNotification: (state) => {
      state.notificationCount += 1;
    },
    resetNotification: (state) => {
      state.notificationCount = 0;
    },
    setNotificationCount: (state, action) => {
      state.notificationCount = action.payload;
    },
    setNewMessagesAlert: (state, action) => {
      const idx = state.newMessagesAlert.findIndex(
        (item) => item.chatId === action.payload.chatId
      );

      if (idx !== -1) state.newMessagesAlert[idx].count += 1;
      else {
        state.newMessagesAlert.push({
          chatId: action.payload.chatId,
          count: 1,
        });
      }
    },
    removeNewMessagesAlert: (state, action) => {
      state.newMessagesAlert = state.newMessagesAlert.filter(
        (item) => item.chatId !== action.payload
      );
    },
  },
});

export default chatSlice;
export const {
  incrementNotification,
  resetNotification,
  setNotificationCount,
  setNewMessagesAlert,
  removeNewMessagesAlert,
} = chatSlice.actions;

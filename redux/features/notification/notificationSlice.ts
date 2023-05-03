import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: NotificationInitialState = {
  notifications: [],
};

interface NotificationInitialState {
  notifications: NotificationItem[];
}

interface NotificationItem {
  key?: any;
  message: any;
  options?: {
    variant?: string;
  };
  dismissed?: boolean;
}
export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    enqueueSnackbar: (state, action: PayloadAction<NotificationItem>) => {
      state.notifications.push({
        key: action.payload.key || new Date().getTime() + Math.random(),
        ...action.payload,
      });
    },
    closeSnackbar: (state, action: PayloadAction<{ key: any }>) => {
      state.notifications = state.notifications.map((item) => {
        if (item.key == action.payload.key) return { ...item, dismissed: true };
        return item;
      });
    },
    removeSnackbar: (state, action: PayloadAction<{ key: any }>) => {
      state.notifications = state.notifications.filter(
        (item) => item.key !== action.payload.key
      );
    },
  },
});

export const { enqueueSnackbar, removeSnackbar, closeSnackbar } =
  notificationSlice.actions;

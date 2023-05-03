import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { missionSlice } from "./features/mission/missionSlice";
import { authSlice } from "./features/auth";
import { notificationSlice } from "./features/notification/notificationSlice";
import { customizationSlice } from "./features/customization/customizationSlice";
import { menuSlice } from "./features/menu/menuSlice";
import { menuProfileSlice } from "./features/menu/menuprofileSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    notification: notificationSlice.reducer,
    customization: customizationSlice.reducer,
    menu: menuSlice.reducer,
    menuprofile: menuProfileSlice.reducer,
    mission: missionSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

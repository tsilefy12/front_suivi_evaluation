import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { missionSlice } from "./features/mission/missionSlice";
import { authSlice } from "./features/auth";
import { notificationSlice } from "./features/notification/notificationSlice";
import { customizationSlice } from "./features/customization/customizationSlice";
import { menuSlice } from "./features/menu/menuSlice";
import { menuProfileSlice } from "./features/menu/menuprofileSlice";
import { missionGoalSlice } from "./features/missionGoal/missionGoalSlice";
import { exceptedResultSlice } from "./features/exceptedResult/exceptedResultSlice";
import { plannedActivitySlice } from "./features/plannedActivity/plannedActivitySlice";
import { deliverableSlice } from "./features/deliverable/deliverableSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    notification: notificationSlice.reducer,
    customization: customizationSlice.reducer,
    menu: menuSlice.reducer,
    menuprofile: menuProfileSlice.reducer,
    mission: missionSlice.reducer,
    missionGoal: missionGoalSlice.reducer,
    exceptedResult: exceptedResultSlice.reducer,
    plannedActivity: plannedActivitySlice.reducer,
    deliverable: deliverableSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;

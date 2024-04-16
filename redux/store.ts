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
import { missionLocationSlice } from "./features/missionLocation/missionLocationSlice";
import { vehicleSlice } from "./features/vehicle/vehicleSlice";
import { contactSlice } from "./features/contact/contactSlice";
import { missionarySlice } from "./features/missionary/missionarySlice";
import { employeSlice } from "./features/employe";
import { grantEncoursSlice } from "./features/grantEncours/grantEncoursSlice";

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
    missionLocation: missionLocationSlice.reducer,
    vehicle: vehicleSlice.reducer,
    contact: contactSlice.reducer,
    missionary: missionarySlice.reducer,
    employe: employeSlice.reducer,
    grantEncours: grantEncoursSlice.reducer,

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

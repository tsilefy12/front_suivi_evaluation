import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { customizationSlice } from './slices/customizationSlice';
import { menuSlice } from './menu/menuSlice';
import { menuProfileSlice } from './menu/menuprofileSlice';

export const store = configureStore({
  reducer: {
    customization: customizationSlice.reducer,
    menu: menuSlice.reducer,
    menuprofile: menuProfileSlice.reducer
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
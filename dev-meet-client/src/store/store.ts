import { configureStore } from "@reduxjs/toolkit";
import userProfileReducer from './slices/UserProfileSlice'; 

export const store = configureStore({
    reducer: {
        profile: userProfileReducer,
    }
});

/**
 * It's a best practice to export these types to use throughout your app
 * instead of importing them from 'react-redux' every time.
 */

// Infer the `RootState` type from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Infer the `AppDispatch` type from the store itself
export type AppDispatch = typeof store.dispatch;

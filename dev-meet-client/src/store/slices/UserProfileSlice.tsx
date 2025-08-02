import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProfile, logoutUser } from "@/lib/helper";
import { IUser } from "@/lib/interface";

// Define a type for the slice state
interface UserProfileState {
    user: IUser | null; // User can be null if not logged in
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null; 
}

const initialState: UserProfileState = {
    user: null,
    status: 'idle',
    error: null,
};

// Async thunk for fetching the profile
export const fetchUserProfile = createAsyncThunk(
    'userProfile/fetchProfile',
    async (_, { rejectWithValue }) => {
        try {
            const user = await fetchProfile();
            if (!user) {
                return rejectWithValue('User not logged in or session expired.');
            }
            return user;
        } catch (error: unknown) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue('An unknown error occurred.');
        }
    }
);

// Async thunk for logging out
export const logoutUserThunk = createAsyncThunk(
    'userProfile/logout',
    async (_, { rejectWithValue }) => {
        try {
            await logoutUser();
        } catch (error: unknown) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue('An unknown logout error occurred.');
        }
    }
);

// Create the slice
const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState,
    reducers: {
        // NEW: A synchronous reducer to set the user immediately after login
        setUserOnLogin: (state, action) => {
            state.user = action.payload;
            state.status = 'succeeded'; // Mark status as succeeded
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Cases for fetching profile
            .addCase(fetchUserProfile.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.status = 'failed';
                if (typeof action.payload === 'string') {
                    state.error = action.payload;
                }
            })
            // Case for when logout is successful
            .addCase(logoutUserThunk.fulfilled, (state) => {
                state.user = null;
                state.status = 'idle';
                state.error = null;
            });
    },
});

// Export the new action creator
export const { setUserOnLogin } = userProfileSlice.actions;

export default userProfileSlice.reducer;

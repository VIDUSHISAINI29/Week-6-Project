import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slice/authSlice.js';
// import postsSlice from './slices/postsSlice';
// import connectionsSlice from './slices/connectionsSlice';
// import gamificationSlice from './slices/gamificationSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    // posts: postsSlice,
    // connections: connectionsSlice,
    // gamification: gamificationSlice,
  },
});

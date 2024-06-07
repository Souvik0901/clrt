// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // You need to create this file

const store = configureStore({
  reducer: userReducer,
});

export default store;

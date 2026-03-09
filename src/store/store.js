import { configureStore } from "@reduxjs/toolkit";
import authSlice from './authSlice';
import postSlice from './postSlice'; // Isko import karna mat bhulna!

const store = configureStore({
    reducer: {
        auth: authSlice,
        posts: postSlice, // Ab Redux ko pata hai ki 'posts' state bhi exist karti hai
    }
});

export default store;
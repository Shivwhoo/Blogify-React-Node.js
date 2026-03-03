import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    currentPost: null,
  },
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
    addPost(state, action) {
      state.posts.unshift(action.payload);
    },
    setCurrentPost(state, action) {
      state.currentPost = action.payload;
    },
    removePost(state, action) {
      state.posts = state.posts.filter(
        post => post._id !== action.payload
      );
    },
  },
});

export const {
  setPosts,
  addPost,
  setCurrentPost,
  removePost,
} = postSlice.actions;

export default postSlice.reducer;

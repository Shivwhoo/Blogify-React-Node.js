import api from "../axios/axios";

// CREATE POST (multipart)
const createPost = (data) =>
  api.post("/posts", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// UPDATE POST (multipart)
const updatePost = (postId, data) =>
  api.patch(`/posts/${postId}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// DELETE POST
const deletePost = (postId) =>
  api.delete(`/posts/${postId}`);

// GET SINGLE POST (by slug)
const getPost = (slug) =>
  api.get(`/posts/${slug}`);

// GET ALL POSTS
const getPosts = () =>
  api.get("/posts");

//Get File Preview

const getFilePreview = (slug) => ( api.get(`/posts/${slug}/preview`))

export {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getPosts,
  getFilePreview
};

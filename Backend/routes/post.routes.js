import { Router } from "express";
import {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getPosts,
  getFilePreview
} from "../controllers/post.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js"; 

const router = Router();

// GET ALL POSTS
// Route: GET /api/v1/posts (assuming your base URL mounts this router at /posts)
router.route("/")
  .get(getPosts);

// CREATE POST
// Route: POST /api/v1/posts
// Requires Auth & Multer middleware to handle the multipart/form-data file upload
router.route("/")
  .post(
    verifyJWT, 
    upload.single("featuredImage"), // The frontend field name for the file should be "featuredImage"
    createPost
  );

// GET SINGLE POST
// Route: GET /api/v1/posts/:slug
router.route("/:slug")
  .get(getPost);

// UPDATE POST
// Route: PATCH /api/v1/posts/:postId
// Requires Auth & Multer
router.route("/:postId")
  .patch(
    verifyJWT, 
    upload.single("featuredImage"), 
    updatePost
  );

// DELETE POST
// Route: DELETE /api/v1/posts/:postId
// Requires Auth
router.route("/:postId")
  .delete(
    verifyJWT, 
    deletePost
  );

router.route("/:slug/preview").get(getFilePreview);

export default router;
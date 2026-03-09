import slugify from "slugify";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Post } from "../models/post.model.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";

/**
 * CREATE POST
 */
export const createPost = asyncHandler(async (req, res) => {
  const { title, content, status } = req.body;

  if (!title || !content) {
    throw new ApiError(400, "Title and content are required");
  }

  const slug = slugify(title, { lower: true, strict: true });

  const existingPost = await Post.findOne({ slug });
  if (existingPost) {
    throw new ApiError(409, "Post with same title already exists");
  }

  let featuredImage;
  if (req.file?.path) {
    const uploadResult = await uploadOnCloudinary(req.file.path);
    featuredImage = uploadResult?.url;
  }

  const post = await Post.create({
    title,
    slug,
    content,
    status: status || "active",
    featuredImage,
    owner: req.user._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, post, "Post created successfully"));
});

/**
 * UPDATE POST
 */
export const updatePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { title, content, status } = req.body;

  const post = await Post.findById(postId);
  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  if (post.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not allowed to update this post");
  }

  if (title && title !== post.title) {
    const newSlug = slugify(title, { lower: true, strict: true });

    const slugExists = await Post.findOne({
      slug: newSlug,
      _id: { $ne: postId },
    });

    if (slugExists) {
      throw new ApiError(409, "Post with same title already exists");
    }

    post.title = title;
    post.slug = newSlug;
  }

  if (content) post.content = content;
  if (status) post.status = status;

  if (req.file?.path) {
    if (post.featuredImage) {
      await deleteFromCloudinary(post.featuredImage);
    }

    const uploadResult = await uploadOnCloudinary(req.file.path);
    post.featuredImage = uploadResult?.url;
  }

  await post.save();

  return res
    .status(200)
    .json(new ApiResponse(200, post, "Post updated successfully"));
});

/**
 * DELETE POST
 */
export const deletePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  const post = await Post.findById(postId);
  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  if (post.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not allowed to delete this post");
  }

  if (post.featuredImage) {
    await deleteFromCloudinary(post.featuredImage);
  }

  await Post.findByIdAndDelete(postId);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Post deleted successfully"));
});

/**
 * GET SINGLE POST (by slug)
 */
export const getPost = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const post = await Post.findOne({ slug }).populate(
    "owner",
    "username email"
  );

  if (!post || post.status !== "active") {
    throw new ApiError(404, "Post not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, post, "Post fetched successfully"));
});

/**
 * GET ALL POSTS
 */
export const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ status: "active" })
    .sort({ createdAt: -1 })
    .populate("owner", "username");

  return res
    .status(200)
    .json(new ApiResponse(200, posts, "Posts fetched successfully"));
});

/**
 * GET FILE PREVIEW
 */
export const getFilePreview = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const post = await Post.findOne({ slug });

  if (!post || !post.featuredImage) {
    throw new ApiError(404, "Preview image not found");
  }

  // Apply Cloudinary transformation for a smaller preview image
  const previewUrl = post.featuredImage.replace(
    "/upload/",
    "/upload/w_400,q_auto,f_auto/"
  );

  return res.status(200).json(
    new ApiResponse(200, { previewUrl }, "File preview fetched successfully")
  );
});
import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Button from "./Header/Button";
import Input from "./Input";
import Select from "./Select";
import RTE from "./RTE";
import { createPost, updatePost } from "../services/config";

function PostForm({ post }) {
  const navigate = useNavigate();

  const { register, handleSubmit, control, watch, setValue, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  // slug generator (frontend preview only)
  const slugTransform = useCallback((value) => {
    if (typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
    }
    return "";
  }, []);

  // auto-update slug when title changes
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), {
          shouldValidate: true,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  const submit = async (data) => {
    try {
      const formData = new FormData();

      // Ensure we are sending strings
      formData.append("title", data.title);
      formData.append("content", data.content); // RTE usually saves as HTML string
      formData.append("status", data.status);

      // Only append the image if a NEW file was selected
      if (data.featuredImage && data.featuredImage[0]) {
        formData.append("featuredImage", data.featuredImage[0]);
      }

      let response;

      if (post) {
        // UPDATE: Using post._id from the prop
        response = await updatePost(post._id, formData);
      } else {
        // CREATE
        response = await createPost(formData);
      }

      // Backend returns ApiResponse(201/200, post, "message")
      // Accessing: response.data (Axios) -> .data (ApiResponse) -> .slug (Post object)
      const finalPost = response?.data?.data;

      if (finalPost && finalPost.slug) {
        navigate(`/post/${finalPost.slug}`);
      }
    } catch (error) {
      console.error("Post submit error:", error);
      // Optional: Add a state for local error message to show the user
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-12 px-4">
      <div className="bg-white border border-zinc-200 p-8 shadow-sm">
        <h1 className="text-xl font-bold uppercase tracking-[0.2em] mb-10 text-zinc-800 border-b border-zinc-100 pb-4">
          {post ? "Edit Post" : "Create New Post"}
        </h1>

        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap -mx-4">
          {/* LEFT SIDE: MAIN CONTENT (70%) */}
          <div className="w-full lg:w-2/3 px-4 space-y-6">
            <Input
              label="Post Title"
              placeholder="Enter a captivating title"
              className="mb-4"
              {...register("title", { required: true })}
            />

            <Input
              label="Slug / URL Path"
              placeholder="auto-generated-url-path"
              className="mb-4"
              {...register("slug", { required: true })}
              onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), {
                  shouldValidate: true,
                });
              }}
            />

            <div className="mt-6">
              <RTE
                label="Content Editor"
                name="content"
                control={control}
                defaultValue={getValues("content")}
              />
            </div>
          </div>

          {/* RIGHT SIDE: SIDEBAR (30%) */}
          <div className="w-full lg:w-1/3 px-4 mt-10 lg:mt-0 space-y-8">
            <div className="bg-zinc-50 p-6 border border-zinc-100 space-y-6">
              <Input
                label="Featured Image"
                type="file"
                className="mb-4 bg-white"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("featuredImage", { required: !post })}
              />

              {/* Show preview if editing an existing post */}
              {post && post.featuredImage && (
                <div className="w-full mb-4">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 mb-2">
                    Current Image
                  </p>
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-auto border border-zinc-200 grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              )}

              <Select
                options={["active", "inactive"]}
                label="Post Status"
                className="mb-6 bg-white"
                {...register("status", { required: true })}
              />

              <hr className="border-zinc-200" />

              <Button
                type="submit"
                className={`w-full py-4 uppercase tracking-[0.15em] font-bold text-xs ${
                  post ? "bg-zinc-800 text-white" : "bg-black text-white"
                } hover:bg-zinc-700 transition-colors`}
              >
                {post ? "Update Entry" : "Publish Post"}
              </Button>
            </div>

            <p className="text-[10px] text-zinc-400 text-center uppercase tracking-tighter">
              Drafts are saved automatically to the cloud.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostForm;

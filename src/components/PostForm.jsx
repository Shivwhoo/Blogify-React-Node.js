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

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
  } = useForm({
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

      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("status", data.status);

      if (data.featuredImage?.[0]) {
        formData.append("featuredImage", data.featuredImage[0]);
      }

      let response;

      if (post) {
        // UPDATE
        response = await updatePost(post._id, formData);
      } else {
        // CREATE
        response = await createPost(formData);
      }

      if (response?.data?.data?.slug) {
        navigate(`/post/${response.data.data.slug}`);
      }
    } catch (error) {
      console.error("Post submit error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      {/* TITLE */}
      <Input
        label="Title"
        placeholder="Enter post title"
        {...register("title", { required: true })}
      />

      {/* SLUG (preview only, backend final authority) */}
      <Input
        label="Slug"
        placeholder="auto-generated"
        {...register("slug", { required: true })}
      />

      {/* CONTENT */}
      <RTE
        name="content"
        label="Content"
        control={control}
        defaultValue={getValues("content")}
      />

      {/* FEATURED IMAGE */}
      <Input
        label="Featured Image"
        type="file"
        accept="image/*"
        {...register("featuredImage")}
      />

      {/* STATUS */}
      <Select
        label="Status"
        options={["active", "inactive"]}
        {...register("status")}
      />

      {/* SUBMIT */}
      <Button type="submit">
        {post ? "Update Post" : "Create Post"}
      </Button>
    </form>
  );
}

export default PostForm;

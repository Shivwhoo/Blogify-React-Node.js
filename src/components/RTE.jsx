import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 text-[10px] uppercase tracking-[0.15em] font-bold text-zinc-500 ml-1">
          {label}
        </label>
      )}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange, value } }) => (
          <div className="border border-zinc-200 focus-within:border-zinc-800 transition-colors duration-200">
            <Editor
              apiKey='doei8xj0cvqw85d0ctxksqyg6lwn2kd7s21g1o1vwks6ejvc'
              // defaultValue aur value dono handle kar liye taaki Edit mode mein content miss na ho
              value={value || defaultValue}
              init={{
                height: 500,
                menubar: true,
                branding: false,
                statusbar: false, // Cleaner look ke liye statusbar hataya
                skin: "oxide",
                content_css: "default",
                plugins: [
                  "advlist", "autolink", "lists", "link", "image", "charmap", "preview",
                  "anchor", "searchreplace", "visualblocks", "code", "fullscreen",
                  "insertdatetime", "media", "table", "help", "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                content_style: `
                  body { 
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; 
                    font-size: 14px; 
                    color: #3f3f46; 
                    background-color: #fff;
                    line-height: 1.6;
                  }
                `,
              }}
              // Jab bhi editor mein change ho, react-hook-form ko update karo
              onEditorChange={(content) => onChange(content)}
            />
          </div>
        )}
      />
    </div>
  );
}

export default RTE;
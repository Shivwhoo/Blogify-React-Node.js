import React, { useEffect, useState } from "react";
import { getFilePreview } from "../services/config";
import { Link } from "react-router-dom";

// 1. Ensure 'slug' is extracted from props
function Postcard({ slug, title, featuredImage }) { 
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        // 2. Check if slug exists before making API call
        if (slug) {
            getFilePreview(slug)
                .then((res) => {
                    // Sync with your ApiResponse structure: res.data.data.preview
                    if (res?.data?.data?.preview) {
                        setPreview(res.data.data.preview);
                    }
                })
                .catch(() => setPreview(null));
        }
    }, [slug]);

    if (!slug) return null; // Safety check to prevent crash

    return (
        <Link to={`/post/${slug}`}>
            <div className="bg-white border border-zinc-200 shadow-sm overflow-hidden transition-all duration-300 hover:border-zinc-400">
                <div className="aspect-video w-full bg-zinc-200">
                    {preview ? (
                        <img src={preview} alt={title} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full animate-pulse bg-zinc-300" />
                    )}
                </div>
                <div className="p-4">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-800">{title}</h2>
                </div>
            </div>
        </Link>
    );
}

export default Postcard;
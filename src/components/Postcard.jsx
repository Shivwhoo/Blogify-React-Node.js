import React from "react";
import { Link } from "react-router-dom";

// Optional: A tiny local function to compress the Cloudinary image on the fly
const getOptimizedUrl = (url) => {
    if (!url) return "";
    return url.replace("/upload/", "/upload/w_400,q_auto,f_auto/");
};

function Postcard({ slug, title, featuredImage }) { 
    if (!slug) return null; // Safety check

    return (
        <Link to={`/post/${slug}`}>
            <div className="bg-white border border-zinc-200 shadow-sm overflow-hidden transition-all duration-300 hover:border-zinc-400">
                <div className="aspect-video w-full bg-zinc-200">
                    {featuredImage ? (
                        <img 
                            // We use the optimized URL here for fast loading!
                            src={getOptimizedUrl(featuredImage)} 
                            alt={title} 
                            className="w-full h-full object-cover" 
                        />
                    ) : (
                        // Fallback skeleton if a post somehow has no image
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
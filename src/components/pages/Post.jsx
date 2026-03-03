import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom'
import { getPost, deletePost } from '../../services/config' // Assuming deletePost exists in your service
import Container from '../container/Container'
import Button from '../Header/Button'
import parse from 'html-react-parser'

function Post() {
    const [post, setPost] = useState(null)
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData)

const isAuthor = post && userData ? 
    (post.owner?._id?.toString() === userData?._id?.toString() || 
     post.owner?.toString() === userData?._id?.toString()) 
    : false;

useEffect(() => {
    if (slug) {
        getPost(slug).then((res) => {
            // res.data.data mein single post object hai
            if (res?.data?.data) {
                setPost(res.data.data);
            } else {
                navigate('/');
            }
        });
    }
}, [slug, navigate]);

    const deleteEntry = () => {
        const confirmed = window.confirm("Are you sure you want to delete this masterpiece?")
        if (confirmed) {
            deletePost(post._id).then((status) => {
                if (status) navigate("/")
            })
        }
    }

    if (!post) return null;

    return (
        
        <div className="py-12 bg-zinc-50 min-h-screen font-sans">
            <Container>
                <article className="max-w-4xl mx-auto bg-white border border-zinc-200 shadow-sm overflow-hidden">
                    
                    {/* Featured Image */}
                    <div className="w-full aspect-video bg-zinc-200 relative">
                        <img
                            src={post.featuredImage}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />

                        {/* Author Controls */}
                        {isAuthor && (
                            <div className="absolute top-4 right-4 flex gap-3">
                                <Link to={`/edit-post/${post.slug}`}>
                                    <Button bgColor="bg-zinc-800" className="px-4 py-2 text-[10px]">
                                        Edit
                                    </Button>
                                </Link>
                                <Button 
                                    onClick={deleteEntry}
                                    bgColor="bg-red-600" 
                                    className="px-4 py-2 text-[10px]"
                                >
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Content Section */}
                    <div className="p-8 md:p-16">
                        <header className="mb-10 text-center">
                            <h1 className="text-3xl md:text-5xl font-bold text-zinc-900 uppercase tracking-tight leading-tight mb-6">
                                {post.title}
                            </h1>
                            <div className="flex items-center justify-center gap-4">
                                <div className="h-[1px] w-12 bg-zinc-200"></div>
                                <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-400">
                                    Published by {post.owner?.username || 'Anonymous'}
                                </span>
                                <div className="h-[1px] w-12 bg-zinc-200"></div>
                            </div>
                        </header>

                        {/* Rich Text Content */}
                        <div className="prose prose-zinc max-w-none text-zinc-700 leading-relaxed text-lg">
                            {parse(post.content)}
                        </div>
                    </div>
                </article>
            </Container>
        </div>
    )
}

export default Post
import React, { useEffect, useState } from 'react'
import Container from '../container/Container'
import PostForm from '../PostForm'
import { getPost } from '../../services/config'
import { useNavigate, useParams } from 'react-router-dom'
import LoadingPage from './Loading' // Import your minimalist loader

function EditPost() {
    const [post, setPost] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()

useEffect(() => {
    if (slug) {
        getPost(slug).then((res) => {
            if (res?.data?.data) {
                setPost(res.data.data);
            }
        });
    } else {
        navigate('/');
    }
}, [slug, navigate]);

    return post ? (
        <div className='py-12 bg-zinc-100 min-h-screen font-sans'>
            <Container>
                {/* Page Header */}
                <div className="mb-10 px-2">
                    <h1 className="text-2xl font-bold uppercase tracking-[0.3em] text-zinc-800">
                        Edit Entry
                    </h1>
                    <div className="flex items-center gap-4 mt-2">
                        <p className="text-zinc-400 text-[10px] uppercase tracking-widest italic">
                            Modifying: {post.title}
                        </p>
                        <div className="h-[1px] w-12 bg-zinc-300"></div>
                    </div>
                </div>

                {/* Form Wrapper */}
                <div className="bg-white border border-zinc-200 p-2 md:p-8 shadow-sm">
                    <PostForm post={post} />
                </div>
            </Container>
        </div>
    ) : (
        <LoadingPage />
    )
}

export default EditPost
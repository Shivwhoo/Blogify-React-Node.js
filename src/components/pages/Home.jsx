import React, { useEffect, useState } from 'react'
import { getPosts } from '../../services/config'
import Container from '../container/Container'
import Postcard from '../Postcard'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {
        // Sirf tabhi fetch karo jab user logged in ho
        if (authStatus) {
            getPosts()
                .then((res) => {
                    if (res?.data?.data) {
                        setPosts(res.data.data)
                    }
                })
                .catch((err) => {
                    console.error("Fetch error:", err)
                    setPosts([])
                })
                .finally(() => setLoading(false))
        } else {
            setLoading(false)
        }
    }, [authStatus]) // authStatus change hone par re-fetch karega

    // Condition 1: Agar User Logged in nahi hai
    if (!authStatus) {
        return (
            <div className="w-full py-20 text-center bg-zinc-100 min-h-[70vh] flex items-center">
                <Container>
                    <h1 className="text-2xl font-bold uppercase tracking-widest text-zinc-800">
                        Please Login to see blogs
                    </h1>
                    <Link 
                        to="/login" 
                        className="mt-6 inline-block px-10 py-4 bg-zinc-800 text-white text-[10px] uppercase tracking-[0.3em] hover:bg-zinc-700 transition-all"
                    >
                        Login Now
                    </Link>
                </Container>
            </div>
        )
    }

    // Condition 2: Logged in hai par koi post nahi mili
    if (posts.length === 0 && !loading) {
        return (
            <div className="w-full py-20 mt-10 text-center bg-zinc-100 min-h-[70vh] flex items-center">
                <Container>
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-zinc-800 uppercase tracking-[0.4em] mb-6">
                            Blogify<span className="text-zinc-400">.</span>
                        </h1>
                        <p className="text-zinc-500 text-xs md:text-sm uppercase tracking-[0.2em] mb-10 max-w-md leading-loose">
                            No posts found. Be the first one to share a story!
                        </p>
                        <Link 
                            to="/add-post" 
                            className="px-10 py-4 bg-zinc-800 text-white text-[10px] uppercase tracking-[0.3em] hover:bg-zinc-700 transition-all shadow-xl"
                        >
                            Create Post
                        </Link>
                    </div>
                </Container>
            </div>
        )
    }

    // Condition 3: Logged in hai aur posts bhi hain (Main Feed)
    return (
        <div className='w-full py-12 bg-zinc-50 min-h-screen'>
            <Container>
                <div className="mb-16 border-l-2 border-zinc-800 pl-8 py-2">
                    <h1 className="text-3xl font-bold uppercase tracking-[0.2em] text-zinc-900">
                        Latest Feed
                    </h1>
                    <p className="text-zinc-400 text-[10px] uppercase tracking-widest mt-2 italic">
                        Fresh perspectives and modern stories
                    </p>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-12'>
                    {posts.map((post) => (
                        <div key={post._id} className='w-full'>
                            <Postcard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home
import React, { useState, useEffect } from 'react'
import { getPosts } from '../../services/config'
import Container from '../container/Container'
import Postcard from '../Postcard'

function AllPost() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

   useEffect(() => {
    getPosts([])
        .then((res) => {
            // Backend response se array nikalna
            if (res?.data?.data) {
                setPosts(res.data.data);
            }
        })
        .finally(() => setLoading(false));
}, []);

    return (
        <div className='w-full py-12 bg-zinc-100 min-h-screen font-sans'>
            <Container>
                {/* Section Header */}
                <div className="mb-12 px-2">
                    <h1 className="text-2xl font-bold uppercase tracking-[0.3em] text-zinc-800">
                        All Entries
                    </h1>
                    <p className="text-zinc-400 text-[10px] uppercase tracking-widest mt-2">
                        Browse the complete archive
                    </p>
                </div>

                {/* Posts Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                    { Array.isArray(posts) && posts.map((post) => (
                        <div key={post.$id || post._id} className='w-full'>
                            <Postcard {...post} />
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {!loading && posts.length === 0 && (
                    <div className="text-center py-20 bg-white border border-zinc-200">
                        <p className="text-zinc-400 text-xs uppercase tracking-widest italic">
                            No stories found in the archive.
                        </p>
                    </div>
                )}
            </Container>
        </div>
    )
}

export default AllPost
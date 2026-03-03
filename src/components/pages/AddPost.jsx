import React from 'react'
import Container from '../container/Container'
import PostForm from '../PostForm'

function AddPost() {
  return (
    <div className='py-12 bg-zinc-100 min-h-screen font-sans'>
        <Container>
            {/* Page Header */}
            <div className="mb-10 px-2">
                <h1 className="text-2xl font-bold uppercase tracking-[0.3em] text-zinc-800">
                    Create Entry
                </h1>
                <div className="flex items-center gap-4 mt-2">
                    <p className="text-zinc-400 text-[10px] uppercase tracking-widest italic">
                        Drafting Mode
                    </p>
                    <div className="h-[1px] w-12 bg-zinc-300"></div>
                </div>
            </div>

            {/* Form Wrapper */}
            <div className="bg-white border border-zinc-200 p-2 md:p-8 shadow-sm">
                <PostForm />
            </div>
        </Container>
    </div>
  )
}

export default AddPost
import React from 'react'
import {Login as LoginC} from '../Login.jsx'

function Login() {
  return (
    /* min-h-screen: Ensures the gray background covers the whole height
       flex: Used to center the component perfectly
       bg-zinc-100: The signature minimalist gray background
    */
    <div className='min-h-screen py-12 bg-zinc-100 flex items-center justify-center font-sans'>
      <div className='w-full max-w-7xl mx-auto px-4'>
        {/* The LoginComponent already has its own white card styling, 
           so we just provide the clean, gray stage for it to sit on.
        */}
        <LoginC/>
      </div>
    </div>
  )
}

export default Login
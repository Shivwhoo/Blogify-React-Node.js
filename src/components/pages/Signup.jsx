import React from 'react'
import { Signup as SignupComponent } from '../Signup'

function Signup() {
  return (
    /* min-h-screen ensures the gray canvas covers the full viewport height 
       flex + items-center + justify-center keeps the form perfectly dead-center
    */
    <div className='min-h-screen py-12 bg-zinc-100 flex items-center justify-center font-sans'>
      <div className='w-full max-w-7xl mx-auto px-4'>
        {/* SignupComponent is the actual white card with all the form logic */}
        <SignupComponent />
      </div>
    </div>
  )
}

export default Signup
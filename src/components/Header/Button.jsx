import React from 'react'

function Button({
    children,
    type = 'button',
    // Defaulting to Zinc-800 for a deep off-black minimalist look
    bgColor = 'bg-zinc-800', 
    textColor = 'text-zinc-100',
    className = '',
    ...props
}) {
  return (
    <button 
      type={type}
      className={`
        px-6 
        py-2.5 
        text-xs 
        font-medium 
        uppercase 
        tracking-widest 
        transition-all 
        duration-300 
        ease-in-out 
        active:scale-[0.98] 
        hover:opacity-90 
        disabled:opacity-50 
        disabled:cursor-not-allowed
        rounded-none
        ${bgColor} 
        ${textColor} 
        ${className}
      `} 
      {...props}
    >
        {children}
    </button>
  )
}

export default Button
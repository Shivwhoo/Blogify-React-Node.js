import React, { useId } from 'react'

const Input = React.forwardRef(({
    label,
    type = "text",
    className = "",
    ...props
}, ref) => {
    const id = useId();
    return (
        <div className='w-full'>
            {label && (
                <label
                    className='block mb-2 text-[10px] uppercase tracking-[0.15em] font-bold text-zinc-500 ml-1'
                    htmlFor={id}
                >
                    {label}
                </label>
            )}
            <input
                type={type}
                className={`
                    w-full 
                    px-4 
                    py-2.5 
                    bg-white 
                    text-zinc-800 
                    outline-none 
                    duration-200 
                    border 
                    border-zinc-200 
                    focus:border-zinc-800 
                    placeholder:text-zinc-300
                    text-sm
                    rounded-none
                    ${className}
                `}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    )
})

export default Input
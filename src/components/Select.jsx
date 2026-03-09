import React, { forwardRef, useId } from 'react'

function Select({
    options = [],
    label,
    className = "",
    ...props
}, ref) {
    const id = useId()

    return (
        <div className='w-full'>
            {label && (
                <label 
                    htmlFor={id} 
                    className='block mb-2 text-[10px] uppercase tracking-[0.15em] font-bold text-zinc-500 ml-1'
                >
                    {label}
                </label>
            )}
            
            <div className="relative">
                <select
                    {...props}
                    id={id}
                    ref={ref}
                    className={`
                        w-full 
                        px-4 
                        py-2.5 
                        bg-white 
                        text-zinc-800 
                        text-sm
                        outline-none 
                        border 
                        border-zinc-200 
                        focus:border-zinc-800 
                        rounded-none 
                        appearance-none 
                        cursor-pointer
                        duration-200
                        ${className}
                    `}
                >
                    {options?.map((option) => (
                        <option 
                            key={typeof option === 'object' ? option.value : option} 
                            value={typeof option === 'object' ? option.value : option}
                        >
                            {typeof option === 'object' ? option.label : option}
                        </option>
                    ))}
                </select>
                
                {/* Custom minimalist arrow icon */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-400">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default forwardRef(Select)
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as loginAction } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import Button from './Header/Button'
import Input from './Input'
import { signup as signupService } from '../services/authService' // Humara banaya hua service

function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const create = async (data) => {
        setError("")
        setLoading(true)
        
        // Form data object for backend processing
        const formData = new FormData()
        formData.append("fullName", data.fullName)
        formData.append("email", data.email)
        formData.append("username", data.username)
        formData.append("password", data.password)
        
        if (data.avatar[0]) {
            formData.append("avatar", data.avatar[0])
        }

        try {
            // Humara service function use kar rahe hain
            const response = await signupService(formData)

            if (response.data) {
                // Backend return karta hai: { data: { ...userData } }
                const userData = response.data.data
                if (userData) dispatch(loginAction(userData))
                navigate("/")
            }
        } catch (error) {
            // Backend se custom error message nikalne ke liye
            const backendError = error.response?.data?.message || "Registration failed"
            setError(backendError)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-zinc-100 py-12 px-4">
            <div className="w-full max-w-md bg-white border border-zinc-200 p-10 shadow-sm">
                
                <div className="mb-10 text-center">
                    <h2 className="text-xl font-bold uppercase tracking-[0.2em] text-zinc-800">
                        Create Account
                    </h2>
                    <p className="mt-2 text-[10px] text-zinc-400 uppercase tracking-widest">
                        Start your journey with Blogify
                    </p>
                </div>

                {error && (
                    <p className="bg-red-50 border border-red-100 text-red-600 text-[10px] uppercase tracking-widest text-center py-3 mb-6">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit(create)} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                        <Input 
                            label="Full Name" 
                            placeholder="John Doe"
                            {...register("fullName", { required: true })} 
                        />
                        <Input 
                            label="Username" 
                            placeholder="johndoe_01"
                            {...register("username", { required: true })} 
                        />
                        <Input 
                            label="Email" 
                            type="email"
                            placeholder="mail@example.com"
                            {...register("email", { 
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be a valid address",
                                }
                            })} 
                        />
                        <Input 
                            label="Password" 
                            type="password"
                            placeholder="••••••••"
                            {...register("password", { required: true })} 
                        />
                        
                        <Input 
                            label="Avatar (Profile Photo)" 
                            type="file"
                            accept="image/png, image/jpg, image/jpeg"
                            {...register("avatar", { required: true })} 
                        />
                    </div>

                    <Button type="submit" className="w-full mt-6 py-4" disabled={loading}>
                        {loading ? "Creating Profile..." : "Sign Up"}
                    </Button>
                </form>

                <p className="mt-8 text-center text-xs text-zinc-500 tracking-wide">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-bold text-zinc-800 hover:underline underline-offset-4 transition-all"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    )
}

export { Signup }
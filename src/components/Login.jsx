import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as loginAction } from '../store/authSlice'
import Button from './Header/Button' // Ensure the path is correct
import Input from './Input'
import { useDispatch } from 'react-redux'
import { login as loginService, getCurrentUser } from '../services/authService'
import { useForm } from 'react-hook-form'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const login = async (data) => {
        console.log("submit clicked",data)
        setError("")
        setLoading(true)
        try {
            const session = await loginService(data)
            if (session) {
                const userData = await getCurrentUser()
                if (userData?.data?.data) dispatch(loginAction(userData.data.data))
                navigate('/')
            }
        } catch (error) {
            setError(error.message || "Invalid email or password")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-[80vh] px-4 py-12 bg-zinc-100 font-sans">
            <div className="w-full max-w-md bg-white border border-zinc-200 p-10 shadow-sm">
                
                {/* Header Section */}
                <div className="mb-10 text-center">
                    <h2 className="text-xl font-bold uppercase tracking-[0.2em] text-zinc-800">
                        Sign In
                    </h2>
                    <p className="mt-2 text-xs text-zinc-400 tracking-wide">
                        Enter your credentials to access your account
                    </p>
                </div>

                {/* Error Alert */}
                {error && (
                    <p className="bg-red-50 border border-red-100 text-red-600 text-[10px] uppercase tracking-widest text-center py-3 mb-6 animate-pulse">
                        {error}
                    </p>
                )}

                {/* Login Form */}
                <form onSubmit={handleSubmit(login)} className="space-y-6">
                    <div className="space-y-4">
                        <Input
                            label="Email Address"
                            placeholder="mail@example.com"
                            type="email"
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
                            {...register("password", {
                                required: true,
                            })}
                        />
                    </div>

                    <Button 
                        type="submit" 
                        className="w-full mt-4 py-3"
                        disabled={loading}
                    >
                        {loading ? "Verifying..." : "Sign In"}
                    </Button>
                </form>

                {/* Footer Link */}
                <p className="mt-8 text-center text-xs text-zinc-500 tracking-wide">
                    Don&apos;t have an account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-bold text-zinc-800 hover:underline underline-offset-4 transition-all"
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    )
}

export {Login}
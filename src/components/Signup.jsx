import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as loginAction } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import Button from './Header/Button'
import Input from './Input'
import axios from 'axios' // Direct axios use kar rahe hain for file upload

function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const create = async (data) => {
        setError("")
        setLoading(true)
        
        // MAGIC: Browser se file bhejne ke liye FormData object zaroori hai
        const formData = new FormData()
        formData.append("fullName", data.fullName)
        formData.append("email", data.email)
        formData.append("username", data.username)
        formData.append("password", data.password)
        
        // data.avatar ek FileList hai, uska pehla element file hoti hai
        if (data.avatar[0]) {
            formData.append("avatar", data.avatar[0])
        }

        try {
            // Note: Replace with your actual backend URL
            const response = await axios.post("/api/v1/users/register", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            if (response.data) {
                // Agar register ke baad direct login karwana hai
                // Toh response se user data utha ke dispatch kar do
                dispatch(loginAction(response.data.data))
                navigate("/")
            }
        } catch (error) {
            setError(error.response?.data?.message || "Registration failed")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-zinc-100 py-12">
            <div className="w-full max-w-md bg-white border border-zinc-200 p-10 shadow-sm">
                <div className="mb-10 text-center">
                    <h2 className="text-xl font-bold uppercase tracking-[0.2em] text-zinc-800">Join Blogify</h2>
                </div>

                {error && <p className="text-red-600 text-[10px] text-center mb-4 uppercase">{error}</p>}

                <form onSubmit={handleSubmit(create)} className="space-y-4">
                    <Input 
                        label="Full Name" 
                        placeholder="Enter full name"
                        {...register("fullName", { required: true })} 
                    />
                    <Input 
                        label="Username" 
                        placeholder="Choose username"
                        {...register("username", { required: true })} 
                    />
                    <Input 
                        label="Email" 
                        type="email"
                        {...register("email", { required: true })} 
                    />
                    <Input 
                        label="Password" 
                        type="password"
                        {...register("password", { required: true })} 
                    />
                    
                    {/* PHOTO INPUT SECTION */}
                    <Input 
                        label="Avatar (Profile Photo)" 
                        type="file"
                        accept="image/*"
                        {...register("avatar", { required: true })} 
                    />

                    <Button type="submit" className="w-full py-3" disabled={loading}>
                        {loading ? "Registering..." : "Create Account"}
                    </Button>
                </form>
            </div>
        </div>
    )
}

export  {Signup}
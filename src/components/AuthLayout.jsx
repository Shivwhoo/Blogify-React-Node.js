import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LoadingPage from './pages/Loading' // Importing your minimalist loader

function Protected({ children, authentication = true }) {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        /* Logic Breakdown:
           1. If page requires auth (authentication=true) but user is NOT logged in: send to /login
           2. If page is for guests only (authentication=false) but user IS logged in: send to /home
        */
        if (authentication && authStatus !== authentication) {
            navigate('/login')
        } else if (!authentication && authStatus !== authentication) {
            navigate('/')
        }
        
        setLoader(false)
    }, [authStatus, navigate, authentication])

    return loader ? <LoadingPage /> : <>{children}</>
}

export default Protected
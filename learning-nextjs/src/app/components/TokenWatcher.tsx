'use client'
import React from 'react'
import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { useRouter } from 'next/navigation'
import { jwtDecode } from 'jwt-decode'
import { logout } from '../store/slices/userAuthSlice'

export const TokenWatcher = ({children}: {children: React.ReactNode}) => {

    const router= useRouter()
    const dispatch = useAppDispatch()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(!token)return router.push('/')

        const {exp} = jwtDecode<{exp:number}>(token)
        const now = Date.now()/1000

        if(exp<now){
            dispatch(logout())
            router.push('/')
        }

        const timer = setTimeout(() =>{
            dispatch(logout())
            router.push('/')
        }, (exp - now ) * 1000)

        return () => clearTimeout(timer)
    },[])

  return (
    <>{children}</>
  )
}

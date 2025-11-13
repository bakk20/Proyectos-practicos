'use client'
import {motion, AnimatePresence } from 'framer-motion'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { useEffect } from 'react';
import { setShowLogo } from '../store/slices/UiLoader';

export const UiLoader = ({ children }: { children: React.ReactNode }) => {
  const { showLogo, isLoading } = useAppSelector((state) => state.ui);
  const dispatch= useAppDispatch()

  useEffect(() =>{
    const timer = setTimeout(() =>{
      dispatch(setShowLogo(false))
    }, 2500)
  })

 return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        {showLogo ? (
          <motion.div
            key="overlay"
            className="fixed inset-0 flex flex-col items-center justify-center bg-black/80 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {showLogo ? (
              <div className="flex flex-col items-center justify-center">
                <img src="/vercel.svg" alt="loading logo" className='w-14 h-14'/>
              </div>
            ) : (
              <motion.div
                key="spinner"
                className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"
              />
            )}
          </motion.div>
        ) : (<>
            {children}</>
        )}
      </AnimatePresence>
    </div>
    )
};
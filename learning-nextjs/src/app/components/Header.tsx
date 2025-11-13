'use client'
import React, { useEffect, useRef, useState } from 'react'
import { BiMenu, BiChalkboard, BiSelectMultiple } from 'react-icons/bi'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { BsHouse } from 'react-icons/bs'
import { usePathname } from 'next/navigation'
import { HistoryPanel } from '../dndComponents/DashboardComponents/HistoryPanel'



export const Header = () => {
    const [open, setOpen] = useState(false)
    const pathname = usePathname()
    const onkanbanPage = pathname === '/grid-Dashboard'
    const wrapperRef = useRef<HTMLDivElement | null>(null)

    const notifyKanban = () =>{
        window.dispatchEvent(new CustomEvent('toggle-history'))
    }

    const handleMenu = () =>{
        setOpen(prev => !prev)
    }

    useEffect (() =>{
        const handleMouseOut = (e: PointerEvent) =>{
            const el = wrapperRef.current;
            const target = e.target as Node | null;
            if(!el || (target && el.contains(target))) return

            setOpen(false)
        }

            document.addEventListener('pointerdown', handleMouseOut)

            return () =>{
                document.removeEventListener('pointerdown', handleMouseOut)
            }

    },[])

  return (
    <div ref={wrapperRef} className='fixed bg-black w-full flex flex-row justify-between px-3'>
        <AnimatePresence>
        <motion.button 
        key={'button'}
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit ={{opacity: 0}}
        transition={{duration: 0.3}}
        onClick={handleMenu}
        className='bg-black p-2 hover:bg-cyan-950 transition duration-0.5'>
            <BiMenu/>
        </motion.button>
                {open &&(
            <motion.div
            key={'Menu'}
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            transition={{duration:0.3}}
            className='bg-black flex flex-col items-center absolute'
            >
                <button className='bg-black hover:bg-cyan-950 transition duration-0.5'>
                    <Link href={'/hub'}><BsHouse/>Hub</Link>
                </button>
                <button className='bg-black'>
                    <Link href={'/grid-Dashboard'}><BiSelectMultiple/>Dashboard</Link>
                </button>
                <button className='bg-black'>
                    <Link href={'/dnd-tree'}><BiChalkboard/>Flowchart</Link>
                </button>
            </motion.div>
        )}
        {onkanbanPage &&(
            <div>
                <button className='bg-gray-800 text-white hover:bg-yellow-700'
                onClick={notifyKanban}>
                    Historial
                </button>
            </div>
        )}
        </AnimatePresence>

    </div>
  )
}

import { PreviewModalProps } from "@/app/types/dndDashboardTypes"
import { Item } from "@/app/types/dndDashboardTypes"
import { AnimatePresence, motion } from "framer-motion"
import {useEffect, useRef, useState} from 'react'

export default function PreviewModal({item, onClose, onClick, onEdit}: PreviewModalProps){
    return(
            <motion.div
            key={'preview'}
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            transition={{duration:0.3}}
            className="flex flex-col min-h-[300px] w-[1000px] bg-gray-200 gap-2 rounded-md"
            onClick={onClick}
            >
                <div className="gap-2">
                    <div className="flex bg-white w-full rounded-md justify-between">
                        <div className="p-2 rounded-md">
                            <span className="font-bold text-black mr-1">{item.title}</span>
                            <span className="text-black mr-1 text-sm">| {item.date}</span>
                            <span className="text-black mr-1 text-sm">| {item.id}</span>
                        </div>
                        <div className="p-2 flex flex-row">
                            <div className="hover:cursor-pointer mr-1"
                            onClick={()=> onEdit(item.id)}>
                                🔧
                            </div>
                            <div className="hover:cursor-pointer mr-1"
                            onClick={onClose}>
                                ✖
                            </div>
                        </div>
                    </div>

                    <div className="w-full h-full flex items-center justify-start flex-row p-2">
                        <div className="w-[500px] min-h-[100px] bg-white p-2 text-black">
                            {item.description}
                        </div>
                        <div className="p-2 gap-2 min-h-[100px] w-fit">
                            {item.tags?.slice(0).map(tag =>(
                                <span className="text-black gap-2 bg-white border-gray-400 border-1 rounded-md p-1 m-1 hover:cursor-pointer" key={tag}>{tag}</span>))}
                        </div>
                    
                    </div>
                </div>

            </motion.div>
    )
}

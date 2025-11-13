import { useDroppable } from "@dnd-kit/core";
import React from "react";

interface ColumnProps{
    id:string,
    title:string,
    children: React.ReactNode,
    onAdd?: () => void;
    onSeeHistory?: () => void;
}
export const Column = ({id, title, children, onAdd, onSeeHistory}: ColumnProps)  =>{
    const {setNodeRef, isOver} =useDroppable({id})

    return(
        <div ref={setNodeRef} className={`flex flex-col bg-gray-100 rounded p-3 w-full min-h-[800px] h-full`}>
            <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-black">{title}</h3>
                {onAdd &&(
                    <button onClick={onAdd} className="bg-green-500 text-white text-xs px-2
                    py-0.5 rounded"> +Añadir</button>
                )}
                {id==='fin' &&(
                    <button onClick={onSeeHistory} className="bg-yellow-600 text-white text-xs px-2 py-0.5 rounded">
                        Historial
                    </button>
                )}
            </div>
            <div className={`flex-1 h-full ${isOver? "ring-2 ring-Blue-300": ""}`}>{children}</div>
        </div>
    )
}
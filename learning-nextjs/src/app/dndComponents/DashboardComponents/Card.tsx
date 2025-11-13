import { Item } from "@/app/types/dndDashboardTypes";
import { useSortable } from "@dnd-kit/sortable";
import React, { HTMLAttributes } from "react";

interface CardComponents extends HTMLAttributes<HTMLDivElement>{
    id: string,
    data: Item,
    onClick?: (e:React.MouseEvent<HTMLDivElement>) => void;
    onContextMenu?: (e: React.MouseEvent<HTMLDivElement>) => void;
    onClosed?: (id: string) => void;
    onEdit?:(id: string, text:string) => void;
    onRemove?: (id: string) => void;
}

export const Card = ({id, data, onEdit, onClosed, onRemove, onContextMenu, onClick}: CardComponents) => {
    const {attributes, listeners, setNodeRef, transition, isDragging} = useSortable({id});

    const style: React.CSSProperties ={
        transition: isDragging ? 'none' : transition,
        zIndex: isDragging ? 999 : undefined,
        touchAction: 'manipulation',
        opacity: isDragging ? 0.5 : 1
    };

    const MAX_DESC_LENGHT = 120;


    return(
        <div ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        onClick={onClick}
        onContextMenu={onContextMenu}
        className={`bg-white rounded shadow-sm p-3 mb-3 border cursor-grab select-none`}>
            <div
            className="flex flex-col justify-between items-start gap-1">
                <div>
                <strong className="text-sm text-black">{data.title}</strong>
                {/*Añade una preview de la descripcion*/}
                <div className="text-xs text-black">#{id.slice(-4)}</div></div>

                {data.date && <div className="text-xs text-black mt-2">{data.date}</div>}
                {data.tags && <div className="text-xs text-black mt-2">
                {data.tags.slice(0).map(tag => 
                <span className="bg-gray-200 rounded-md m-0.5 p-1" key={tag}>{tag}</span>)}
                </div>}

                {data.description && <div className="text-xs text-black mt-2 break-words whitespace-normal max-w-[350px]">
                    {data.description.length > MAX_DESC_LENGHT
                    ? data.description.slice(0, MAX_DESC_LENGHT) + "..."
                    : data.description}</div>}
                {/*Modificar despues (debo añadir tags y todo lo*/}
            </div>
        </div>
    )
}
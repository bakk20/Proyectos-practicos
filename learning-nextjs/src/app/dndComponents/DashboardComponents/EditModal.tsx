import React, { useEffect, useRef, useState } from "react";
import { Item } from "../../types/dndDashboardTypes";
import { EditModalProps } from "../../types/dndDashboardTypes";
import { motion, AnimatePresence } from "framer-motion";

export default function EditModal({item, onClose, onSave}: EditModalProps){
    const [form, setForm] = useState<Partial<Item>>({
        title: item.title,
        description: item.description ?? "",
        tags: item.tags ?? [],
    })
    const [newTag, setNewTag] = useState("")

    //Pa diseños (quize hacer algo interesante)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [width, setWidth] = useState(200)

    useEffect(() =>{
        if(!inputRef.current) return

        const ctx = document.createElement("canvas").getContext("2d")
        if(!ctx) return
        
        const style = window.getComputedStyle(inputRef.current)
        ctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;

        const textWidth = ctx.measureText(form.title || "").width + 35
        const clamped = Math.min(Math.max(textWidth, 200), 600);
        setWidth(clamped)
    },[form.title])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const {name, value}  = e.target;
        setForm((prev) => ({...prev, [name] : value}) )

    }

    const addTag= (tag?: string) =>{
        const t = (tag ?? newTag).trim()
        if(!t) return;
        const tags = form.tags ?? []
        if(tags.includes(t)){
            setNewTag("")
            return;
        }
        setForm(prev => ({...prev, tags:[...(prev.tags ??[]), t] }))
        setNewTag('')
    }
    const removeTag = (index: number) =>{
        setForm(prev =>{
            const tags = prev.tags ?? []
            return {...prev, tags: tags.filter((_,i) => i !== index)}
        })
    }

    const onTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) =>{
        if(e.key === "Enter"){
        e.preventDefault();
        addTag();
        }
    }

    return(
        <AnimatePresence>
                <motion.div
                key={'editOverlay'}
                initial={{opacity:0}}
                animate={{opacity:1}}
                exit={{opacity:0}}
                transition={{duration: 0.5}} 
                className="absolute w-[800px] h-[700px]  bg-black z-999 p-5 rounded-2xl">

                    <form onSubmit={(e) => {
                            e.preventDefault();
                            onSave(form)}}
                            className='h-full w-full'>
                        <h1>Editar Tarjeta</h1>
                        <label className="flex flex-col">
                            <p>Titulo:</p>
                            <input 
                            ref={inputRef}
                            onChange={(e) => handleChange(e)}
                            name="title"
                            value={form.title ?? ""}
                            placeholder="Titulo..."
                            className="bg-white text-black"
                            style={{ width: `${width}px` }}
                            />
                        </label>

                        <label className="flex flex-row items-center gap-2">
                            <div>
                                <p>Etiquetas</p>
                                <div className="flex gap-2">
                                    <input 
                                    value={newTag}
                                    onChange={e => setNewTag(e.target.value)} 
                                    onKeyDown={onTagKeyDown}
                                    placeholder="añade un tag..." 
                                    className="bg-white text-black max-w-[200px]"/>
                                </div>
                                <button 
                                onClick={(e) =>{ 
                                    e.preventDefault();
                                    addTag()}}
                                className="max-h-fit max-w-fit ml-0">Añadir</button>
                            </div>
                                <div className="flex flex-wrap justify-center items-center justify- gap-1 max-w-[500px]">
                                    {(form.tags ?? []).map((t, i) => (
                                        <div
                                        key={`${t}-${i}`}
                                        className="flex flex-row items-center gap-2 bg-white/90 text-black px-3 py-1 rounded-xl whitespace-nowrap max-h-[40px]"
                                        >
                                        <span>{t}</span>
                                        <button
                                            type="button"
                                            aria-label={`Eliminar ${t}`}
                                            onClick={() => removeTag(i)}
                                            className="font-bold text-white h-[18px] flex items-center p-1 hover:cursor-pointer hover:bg-red-800"
                                            title="Eliminar"
                                        >
                                            ×
                                        </button>
                                        </div>
                                    ))}
                                </div>
                        </label>

                        <label className="h-fit flex flex-col">
                            <p>Descripcion:</p>
                            <textarea onChange={handleChange} name='description' value={form.description ?? ""}
                            className="break-words whitespace-normal rounded-2xl w-[600px] h-[300px] resize-none p-2 bg-white text-black" 
                            />
                        </label>
                        <button onClick={onClose}>
                            Cancelar
                        </button>
                        <button type="submit">
                            Aceptar
                        </button>
                    </form>
                </motion.div>
            </AnimatePresence>
    )

}

    
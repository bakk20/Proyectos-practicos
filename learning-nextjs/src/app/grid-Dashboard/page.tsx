'use client'
import React, {useEffect, useRef, useState} from 'react'
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
    DragOverEvent,
    DragOverlay
} from '@dnd-kit/core'
import{
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable'

import { Columns, Item } from '../types/dndDashboardTypes'
import { generateId } from '../helpers/dndDashboard-helpers'
import { Card } from '../dndComponents/DashboardComponents/Card'
import { Column } from '../dndComponents/DashboardComponents/ColumnWrapper'
import EditModal from '../dndComponents/DashboardComponents/EditModal'

import { AnimatePresence, motion } from 'framer-motion'
import PreviewModal from '../dndComponents/DashboardComponents/PreviewModal'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { RootState } from '../store'
import { addCard, moveCard, deleteCard, updateCard, addHistory, archiveCard } from '../store/slices/boardSlice'
import { HistoryPanel } from '../dndComponents/DashboardComponents/HistoryPanel'
import { DiAptana} from 'react-icons/di'


export default function KanBanBoard(){
    const menuRef = useRef<HTMLDivElement | null>(null)

    const [contextMenu, setContextMenu] = useState<{x: number, y: number, id:string}| null>(null)
    const[isEditing, setIsEditing] = useState(false)
    const[EditingId, setEditingId] = useState<string | null>(null)
    const[previewId, setPreviewId] = useState<string | null>(null)
    const[inPreview, setInPreview] = useState(false)
    const[activeId, setActiveId] = useState<string | null>(null)
    const[seeHistory, setSeeHistory] = useState(false)
    const[inLastColumn, setInlastColumn] = useState(false)
    const[newDate, setNewDate] = useState(0)



    const dispatch = useAppDispatch()
    const columns = useAppSelector(state => state.board.columns )
    const cards = useAppSelector(state => state.board.items)
    const history = useAppSelector(state=> state.board.history)

    

    


    useEffect(() =>{
        const handleOutside = (e: Event) =>{
            const menuEl = menuRef.current;
            if(!menuEl) return;
            const target = e.target as Node | null;
            if(target && menuEl.contains(target)) return;

            setContextMenu(null)
            setPreviewId(null)
            setInPreview(false)

        };

        document.addEventListener('pointerdown', handleOutside, true);
        window.addEventListener('wheel', handleOutside, { passive: true, capture: true });
        window.addEventListener('scroll', handleOutside, {passive: true, capture: true});

        return() =>{
            document.removeEventListener('pointerdown', handleOutside, true);
            window.removeEventListener('wheel', handleOutside, {capture: true})
            window.removeEventListener('scroll', handleOutside, {capture: true})
        }
    },[])


    const sensors = useSensors(useSensor(PointerSensor,
      {activationConstraint :{distance: 8,}}
    ))

    useEffect(() =>{
      const handler = () => setSeeHistory(true)
      window.addEventListener('toggle-history', handler)
      return () => window.removeEventListener('toggle-history', handler)
    },[])

    const findContainer =(id: string | undefined): string | null =>{
        if(!id) return null;
        if(columns[id]) return id
        const col = Object.keys(columns).find((c) => columns[c].includes(id))
        return col?? null
    };

    const handleDragOver = (event: DragOverEvent) => {
      const { active, over } = event;
      if (!over) return;

      const activeId = active.id as string;
      const overId = over.id as string;
      const from = findContainer(activeId);
      const to   = findContainer(overId);
      if (!from || !to) return;

      // distinto contenedor → mover en vivo
      if (from !== to) {
        dispatch(moveCard({ cardId: activeId, from, to }));
        return;
      }

      // mismo contenedor → reorder en vivo
      const list = columns[from];
      const oldIndex = list.indexOf(activeId);
      const newIndex = list.indexOf(overId);
      if (oldIndex !== newIndex) {
        dispatch(moveCard({ cardId: activeId, from, to, targetIndex: newIndex }));
      }
    };

    const handleDragEnd = (event: DragEndEvent) =>{
        const {active, over} = event;
        if(!over) return;

        const activeId = active.id as string;
        const overId = over.id as string;
        const from = findContainer(activeId);
        const to = findContainer(overId);

        if(!from || !to) return;

        //en el mismo contenedor
        if(from === to){
          const list = columns[from];
          const oldIndex = list.indexOf(activeId);
          const newIndex = list.indexOf(overId);
          if(oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex){
            dispatch(moveCard({cardId: activeId, from, to, targetIndex: newIndex}));
          }
          return;
        }
        dispatch(moveCard({cardId: activeId, from, to}));
    }

    const addCardToColumn = (columnId: string) =>{
      const newItem: Omit<Item, 'id' | 'columnId' | 'dateCreated' | 'dateUpdate'> ={
        date: new Date().toLocaleString(),
        title: 'Nueva Tarea',
      };
      const action = dispatch(addCard(columnId, newItem));
      const createdId = action.payload.item.id

      //Nota: No terminado! Los datos que se reciben no son los mismos
      //en el historial como en el canvan, las ids seran diferentes!
    }

    const editCard = (id: string, updates: Partial<Item>) =>{
      dispatch(updateCard({id, updates}));

    };

    const removeCard = (id: string) =>{
      const snapshot = cards[id] ? {...cards[id]} : undefined
      dispatch(deleteCard(id));
    };

    useEffect(() =>{
      if(contextMenu){
        const allowCompletion = Object.keys(columns).some(
          (col) => col === '4' && columns[col].includes(contextMenu.id)
        );
        setInlastColumn(allowCompletion)
      }else{
        setInlastColumn(false)
      }

  },[contextMenu, columns])


return (
    <>
    <div className="p-6 w-full h-full">
    <div className="bg-gray-100 border border-gray-300 rounded-xl shadow-inner p-4 mt-[25px]">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={(e)=>{
          setActiveId(e.active.id as string)
        }}
        onDragCancel={(e) => 
          setActiveId(null)}
        onDragOver={handleDragOver}
        onDragEnd={(e) =>{
          setActiveId(null);
          handleDragEnd(e);
        }}
        >
        <div className="grid grid-cols-4 gap-4">
          {[
            { id: '1', title: "Inicio" },
            { id: '2', title: "Proceso" },
            { id: '3', title: "Revisión" },
            { id: '4', title: "Fin"},
          ].map((col) => (
            <div
              key={col.id}
              className="bg-white border border-gray-300 rounded-lg shadow p-3 flex flex-col"
            >
              {/* título de columna */}
              <div className='flex flex-row justify-between items-center w-full gap-2'>
                <div className='flex flex-row items-center'>
                  <h2 className="text-center font-semibold text-gray-700 mb-0">
                  {col.title}
                  </h2>
                  <h2 className='text-black hover: cursor-pointer hover:text-cyan-500 duration-150'><DiAptana/></h2>
                </div>
                  {col.id==='4' && (
                      <h2 className='text-white font-bold bg-gray-700 rounded-xl px-2 hover:cursor-pointer'>+</h2>
                  )}
              </div>

              <Column id={col.id} title={col.title} 
              onAdd={() => {addCardToColumn(col.id)}}
              onSeeHistory={() => setSeeHistory(true)}>
                <SortableContext
                  items={columns[col.id] ?? []}
                  strategy={verticalListSortingStrategy}
                >
                <AnimatePresence>
                  {(columns[col.id] ?? []).map((cardId) => (
                  <motion.div
                    key={cardId}
                    initial={{opacity:0}}
                    animate={{opacity:1}}
                    layout
                    exit={{opacity:0}}
                    transition={{duration:0.3}}>
                      <Card
                        id={cardId}
                        data={cards[cardId]}
                        onClick={() => {
                          setPreviewId(cardId)
                          setInPreview(true)}}
                        onContextMenu={(e) => {
                          e.preventDefault();
                          setContextMenu({ x: e.clientX, y: e.clientY, id: cardId });
                        }}
                      />
                    </motion.div>

                  ))}
                  </AnimatePresence>
                </SortableContext>
              </Column>
            </div>
          ))}
        </div>

        {/* Menú contextual */}
        {contextMenu && (
          <div
            ref={menuRef}
            className="fixed flex flex-col items-center bg-black text-white shadow-lg rounded-2xl border border-cyan-950 p-3 text-sm z-50"
            style={{ top: contextMenu.y, left: contextMenu.x }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="block w-full text-left hover:bg-cyan-950 px-2 py-1"
              onClick={() => {
                setIsEditing(true)
                setEditingId(contextMenu.id)
                setContextMenu(null)}}
            >
              Editar
            </button>
            <button
              className="flex items-center w-full text-left hover:bg-cyan-950 px-2 py-1"
              onClick={() => {
                removeCard(contextMenu.id);
                setContextMenu(null);
              }}
            >
              Eliminar
            </button>
            {inLastColumn &&(
              <button className='flex items-center w-full text-left hover:bg-cyna-950 px-2 py-1'
              onClick={() =>{                
                dispatch(archiveCard(contextMenu.id))
                setContextMenu(null)
                setInlastColumn(false)
              }}>
              Finalizar
            </button>
            )}

          </div>
        )}
       <AnimatePresence>
         {isEditing && EditingId &&(
          <motion.div
          key={'background-blur'}
          initial={{opacity:0}}
          animate={{opacity:1}}
          exit={{opacity:0}}
          transition={{duration:0.5}}
           className='flex items-center justify-center h-full w-full absolute left-0 top-0 z-100 backdrop-blur-xs overflow-hidden'>
            <EditModal
            item={cards[EditingId]}
            onClose={() => setIsEditing(false)}
            onSave={(values) =>{
              editCard(EditingId, values);
              setIsEditing(false)
            }}
          />
          </motion.div>
        )}

        </AnimatePresence>

        <AnimatePresence>
      {inPreview && previewId &&(
          <motion.div
          key={'PreviewBlur'}
          initial={{opacity:0}}
          animate={{opacity:1}}
          exit={{opacity:0}}
          transition={{duration:0.3}}
          className='flex items-center justify-center h-full w-full bg-black/50 top-0 left-0 absolute'
          onClick={() =>{
            setInPreview(false)
            setPreviewId(null)
          }}>
              <PreviewModal
              item={cards[previewId]}
              onClick={(e) => e!.stopPropagation()}
              onClose={() => {
                setInPreview(false)
                setPreviewId(null)}}
              onEdit={(id) =>{
                setEditingId(id);
                setIsEditing(true)}
               }
              ></PreviewModal>
            </motion.div>
        )}
        </AnimatePresence>

        <AnimatePresence>
          {seeHistory &&(
            <motion.div
          key={'historyBlur'}
          initial={{opacity:0}}
          animate={{opacity:1}}
          exit={{opacity:0}}
          transition={{duration:0.3}}
          className='flex items-center justify-center h-full w-full bg-black/50 top-0 left-0 absolute'
          onClick={(e) => {
            setSeeHistory(false)}}>
              <div onClick={(e) => e.stopPropagation()}>
                <HistoryPanel
                seeHistory={seeHistory}
            />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      <DragOverlay>
        {activeId ? (
          <Card id={activeId} data={cards[activeId]} />
        ) : null}
      </DragOverlay>

      </DndContext>    
    </div>
  </div>
  </>
  
);
}
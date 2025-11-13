import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../store/hooks'
import { RootState } from '../../store'
import { Darumadrop_One } from 'next/font/google'

interface historyPanelProps{
    seeHistory: boolean,
}

export const HistoryPanel = ({seeHistory} : historyPanelProps) => {

    const [selectCardId, setSelectCardId] = useState<string | null>(null)
    
    const historyMap = useAppSelector(state => state.board.history)
    const items = useAppSelector(state => state.board.items)
    const allCards = Object.values(items);

    const movements = selectCardId ? (historyMap?.[selectCardId] ?? []) : []

    const selectedCard = selectCardId
    ? items[selectCardId]
    : null;

    if(!seeHistory) return;
    
  return (
    <div className='space-y-6 flex flex-row ml-10 bg-black rounded-md  h-[700px] min-w-[1200px]'>
        <div className='bg-black rounded-md p-2 h-[700px] w-full flex flex-row'>
            <div className='flex flex-col'>
                <h2 className='font-bold text-lg mb-2 text-gray-400 min-w-[300px]'>
                    Todas las cards
                </h2>
                {allCards.length === 0 && (
                    <p className='text-sm text-gray-500'>No hay cards en el historial!</p>
                )}

                {allCards.map(card => (
                    <div key={card.id} className='rounded-sm mb-2 hover:cursor-pointer
                    hover:bg-white/20 transition-colors duration-300 w-fit'>
                        <p className='font-bold text-gray-400'
                        onClick={() => {
                            setSelectCardId(card.id)}
                        }>{card.title}</p>
                    </div>

                    //    <p className='font-bold text-gray-400'>Fecha de creacion: {new Date(card.dateCreated).toLocaleString()}</p>
                    //  <p className='font-bold text-gray-400'>Ultimo cambio: {card.dateUpdate ? new Date(card.dateUpdate).toLocaleDateString() : 'Sin cambios'}
                    
                ))}
            </div>
                <div className='h-[680px] w-full'>
                    {selectCardId ?(
                    <div className='flex flex-col items-center justify-between mb-2 bg-black rounded-md p-2 w-full h-full'>
                        <div className='border-2 p-2 rounded-sm mb-2 flex flex-col items-center h-full w-full overflow-auto'>
                            <div className='flex flex-row justify-between items-center w-full'>
                                <h2 className='font-bold text-lg text-gray-400'> Historial de {selectedCard?.title ?? ''}</h2>
                                <button onClick={() => setSelectCardId(null)}
                                    className='text-sm text-blue-600 hover:underline'>
                                    volver
                                </button>
                            </div>

                            <div className='flex flex-col overflow-auto w-full h-full'>
                                {movements
                                .slice()
                                .sort((a, b) => a.timestamp - b.timestamp)
                                .map((h) => {
                                    const payload = h.payload as any; // por ahora
                                    return (
                                    <div key={h.id} className="flex flex-col border-2 p-1 w-full">
                                        <div className='flex justify-between flex-row'>
                                            <p className="font-bold text-gray-400">Accion: {h.action.toUpperCase()}</p>
                                            <div className='flex flex-row'>
                                                <p className="font-bold text-gray-400">ID: {payload.item.id}</p>
                                                <p className="font-bold text-gray-400">{new Date(h.timestamp).toLocaleString()}
                                            </p>
                                            </div>
                                        </div>

                                        <div>
                                        {payload?.item ? (
                                            <>
                                            <p className="font-bold text-gray-400">
                                                Fecha de creación:{" "}
                                                {new Date(payload.item.dateCreated).toLocaleString()}
                                            </p>
                                            <p className="font-bold text-gray-400">
                                                Última actualización:{" "}
                                                {payload.item.dateUpdate
                                                ? new Date(payload.item.dateUpdate).toLocaleString()
                                                : "Sin actualizacion"}
                                            </p>
                                            {h.payload.item.columnId === '4' &&(
                                            <p className="font-bold text-gray-400">
                                                Fecha de término:{" "}
                                                {payload.item.dateFinished
                                                ? new Date(payload.item.dateFinished).toLocaleString()
                                                : "Sin fecha de termino"}
                                            </p>
                                            )}
                                            <p className="font-bold text-gray-400">
                                                Tags: {payload.item.tags?.join(", ") ?? "Sin tags"}
                                            </p>
                                            <p className="font-bold text-gray-400">
                                                Descripción: {payload.item.description ?? "Sin descripción"}
                                            </p>
                                            </>
                                        ) : (
                                            <>
                                            <p className="text-gray-400">Payload: {JSON.stringify(payload)}</p>
                                            </>
                                        )}
                                        </div>
                                    </div>
                                    );
                                })}
                                    </div>
                            </div>
                    </div>
                    )
                    :
                    (
                        <div className='h-full w-full flex items-center justify-center border-1 rounded-md'>
                            <p>Elige una card para Ver su historial</p>
                        </div>
                    )}

                </div>
        </div>

        
    </div>
  )
}

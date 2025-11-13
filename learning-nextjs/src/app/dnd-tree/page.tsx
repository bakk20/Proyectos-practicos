'use client'
import { useMemo, useRef, useState } from "react"
import { DndContext, PointerSensor,
useSensor, useSensors, DragEndEvent } from "@dnd-kit/core"
import { NodeData,FlowCanvas } from "../types/dndFlowchartTypes"
import { makeNode, uid } from "../helpers/dndFlowchart-helpers"
import { btn,card,input,panel,tag,tools, importanceColors} from "./customstyle"
import { FiAlertTriangle } from "react-icons/fi"
import { button } from "framer-motion/client"
import { FlowCanvasView } from "./FlowCanvasView"
import { Anchor } from "../types/dndFlowchartTypes"


//Estilos del flowchart - Agregar en un archivo ts despues.

export default function FlowPage(){
  const [canvases, setCanvases] = useState<FlowCanvas[]>(() => [
    { id: uid(), name: "Flow #1", importance:'low', nodes: [], lines: [], nextOrder: 1 },
  ]);
  const [activeId, setActiveId] = useState<string>(canvases[0].id);
  const [canvas, setCanvas] = useState<FlowCanvas>(/* ... */);



  const active = useMemo(
    () => canvases.find((c) => c.id === activeId ) ?? canvases[0],
    [canvases, activeId]
  );

  const addCanvas = () =>{
    const id = uid();
    setCanvases((prev) =>[
        ...prev,
        {id, name:`flow #${prev.length + 1}`,importance:'', nodes: [], lines:[], nextOrder: 1},
    ]);
    setActiveId(id);
  };

  const removeCanvas = (id:string) =>{
    setCanvases((prev) => prev.filter((c) => c.id !==id));
    if(activeId === id && canvases.length > 1){
        const next = canvases.find((c) => c.id !== id);
        if (next) setActiveId(next.id)
    }
  };

  const renameCanvas = (id: string, name:string) => {
    setCanvases((prev) => prev.map((c) => (c.id === id ? {...c, name} : c)))
    };
    const updateImportance = (id:string, importance: string) =>{
        setCanvases((prev) => prev.map((c) => (c.id === id? {...c,importance} : c)))
    };

  const addNode = (canvasId: string, at?: {x: number, y: number},
    sourceNodeId?: string,
    sourceAnchor?: Anchor,
    targetAnchor?: Anchor
  ) =>{
    setCanvases((prev) =>
    prev.map((c) =>{
        if(c.id !== canvasId) return c;
        const node = makeNode({
            order: c.nextOrder,
            position:
            at ?? {x:40 + c.nodes.length *24, y: 40 + c.nodes.length*24},
        });
        console.log("Nuevo nodo creado en canvas:", canvasId, node);
        let newLines = c.lines;
        if(sourceNodeId && sourceAnchor && targetAnchor){
            newLines=[
                ...c.lines,
                {
                    id: node.id,
                    sourceNode:sourceNodeId,
                    targetNode: node.id,
                    sourceAnchor,
                    targetAnchor
                },
            ];
        }
        return{...c, nodes:[...c.nodes, node], lines:newLines,  nextOrder: c.nextOrder + 1};
    })
    );
  };
  
  const handleUpdateNodePos = (canvasId: string, nodeId: string, newPos: {x: number, y: number}) =>{
        setCanvases((prev) =>
            prev.map((c) =>
            c.id === canvasId
                ? {
                    ...c,
                    nodes: c.nodes.map((n) =>
                    n.id === nodeId ? { ...n, position: newPos } : n
                    ),
                }
                : c
            )
        );
        };
  

      const updateNode = (canvasId: string, nodeId: string, updates: Partial<NodeData>) =>{
          setCanvases(prev => prev.map (c =>
              c.id !== canvasId ? c : { ...c, nodes: c.nodes.map(n => (n.id === nodeId ? { ...n, ...updates } : n)) }
          ))
      }

        const handleUpdateCanvas = (canvasId: string, updates: Partial<FlowCanvas>) => {
        setCanvases(prev =>
            prev.map(c =>
            c.id === canvasId
                ? { ...c, ...updates }
                : c
            )
        );
        };

const handleDeleteNode = (canvasId: string, nodeId: string) => {
  setCanvases(prev =>
    prev.map(c => {
      if (c.id !== canvasId) return c;
      const newNodes = c.nodes.filter(n => n.id !== nodeId);
      const newLines = c.lines.filter(line => line.sourceNode !== nodeId && line.targetNode !== nodeId);
      // Reordena los nodos y actualiza el order
      const sorted = newNodes
        .sort((a, b) => a.order - b.order)
        .map((n, i) => ({ ...n, order: i + 1 }));
      return {
        ...c,
        nodes: sorted,
        lines: newLines,
        nextOrder: sorted.length + 1,
      };
    })
  );
};



  return(
    <>
    <div className="absolute top-0 right-0 h-full w-80 bg-black/80 border-l border-gray-700 p-4 flex flex-col gap-4 z-10">
        <header className="flex flex-col m-2 items-center justify-between">
            <h1 className="text-2xl font-bold">FlowCharts</h1>
            <br></br>
            <div className={tools}>
                <button className={btn} onClick={addCanvas}>
                    + New canvas
                </button>
            </div>
        </header>
        <div className="flex gap-2 flex-wrap">
        {canvases.map((c) => (
            <div key={c.id}
            className={`px-3 py-2 rounded-xl border shadow.sm cursor-pointer 
                ${c.id === activeId ? 'bg-gray-950 border-blue-300': 'bg-gray-800'}`}
                onClick={() => setActiveId(c.id)}
                >
                    <div className="flex items-center gap-2 max-w-60">
                        <span className="font-medium text-white truncate">{c.name}</span>
                        <span
                        className={`px-2 py-1 rounded text-xs font-bold ${
                           importanceColors[c.importance] ?? "bg-gray-300 text-black"
                        }`}
                        >
                        <FiAlertTriangle className="inline mr-1" />
                        </span>
                        <span className="text-xs text-gray-500">({c.nodes.length} nodos)</span>
                        {canvases.length > 1 && (
                            <button className="text-xs text-red-600 ml-2"
                            onClick={(e) =>{
                                e.stopPropagation();
                                removeCanvas(c.id)
                            }}
                            >
                                Eliminar
                            </button>
                        )}
                    </div>
            </div>
        ))}
        </div>
    </div>
    <div>
            {active ?(
            <FlowCanvasView 
            canvas={active}
            onAddNode={addNode}
            onChangeImportance={updateImportance}
            onUpdateNodePos={handleUpdateNodePos}
            onRename={renameCanvas}
            onUpdate={updateNode}
            onUpdateCanvas ={handleUpdateCanvas}
            onDeleteNode = {handleDeleteNode}/>
            ):(
                <div className="text-sm text-gray-500">No hay canvas activos!</div>
            )}
    </div>
    </>
  )
  
}
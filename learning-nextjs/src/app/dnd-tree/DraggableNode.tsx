import { NodeData } from "../types/dndFlowchartTypes"
import { useDraggable } from "@dnd-kit/core";
import { btn, nodeLabel, select, tag, importanceColors } from "./customstyle";
import { FiAlertTriangle, FiCheck, FiEdit2 } from "react-icons/fi";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { Line } from "../types/dndFlowchartTypes";
import { canvas } from "framer-motion/client";

type Anchor = 'top' | 'right' | 'bottom' | 'left';



export const UseDraggableNode: React.FC<{
  node: NodeData;
  lines?: Line[];
  onDoubleClick?: (n: NodeData) => void;
  onUpdate: (id: string, updates: Partial<NodeData>) => void;
  // Este onDragStart es para iniciar arrastre desde un anchor (no confundir con dnd-kit drag)
  onDragStart: (nodeId: string, anchor: 'top' | 'bottom' | 'right' | 'left', e: React.MouseEvent) => void;
    onDragVisualOffset?: (id: string, offset: {x: number, y: number}) => void;
  onDelete?:(id: string) =>void 
}> = ({ node, lines = [], onDoubleClick, onUpdate, onDragStart, onDragVisualOffset, onDelete }) => {

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: node.id,
    data: { nodeId: node.id }
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [draftText, setDraftText] = useState(node.text);
  const [draftImportance, setDraftImportance] = useState(node.importance);
  const [draftTitle, setDraftTitle] = useState(node.title);
  const lastOffset = useRef<{x:number, y:number}>({x: 0, y:0})
  const rafRef = useRef<number | null>(null);
  const nodeRef = useRef<HTMLDivElement>(null)
  const [nodeSize, setNodesize] =useState<{w: number, h:number, }>({w: 250, h:100})

  const allAnchors: Anchor[] = ['top', 'right', 'bottom', 'left'];
  const usedAnchors = getUsedAnchors(node.id, lines);

  

  const dragX = transform?.x ?? 0;
  const dragY = transform?.y ?? 0;


  useEffect(() => {
    if (nodeRef.current) {
      const rect = nodeRef.current.getBoundingClientRect();
      setNodesize({ w: rect.width, h: rect.height });
    }
  }, [isEditing, draftTitle, draftText, draftImportance]);

useEffect(() => {
  const newOffset = { x: transform?.x ?? 0, y: transform?.y ?? 0 };
  if (
    newOffset.x !== lastOffset.current.x ||
    newOffset.y !== lastOffset.current.y
  ) {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      lastOffset.current = newOffset;
      onDragVisualOffset?.(node.id, newOffset);
    });
  }
  return () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  };
}, [transform, node.id, onDragVisualOffset, isEditing]);
  

  const handleSave = () => {
    onUpdate(node.id, { title: draftTitle, text: draftText, importance: draftImportance });
    setIsEditing(false);
  };

  const freeAnchors = allAnchors.filter(anchor => {
  // Un anchor está ocupado si este nodo es source O target en alguna línea con ese anchor
  return !lines.some(
    line =>
      (line.sourceNode === node.id && line.sourceAnchor === anchor) ||
      (line.targetNode === node.id && line.targetAnchor === anchor)
  );
});

  function getUsedAnchors(nodeId: string, lines: Line[] = []): Anchor[] {
    const used: Anchor[] = [];
    for (const line of lines) {
      if (line.sourceNode === nodeId) used.push(line.sourceAnchor);
      if (line.targetNode === nodeId) used.push(line.targetAnchor);
    }
    return used;
  }


  

  return (

    <div
      ref={(el) =>{
        setNodeRef(el);
        nodeRef.current = el
      }}
      style={{ transform: `translate3d(${dragX}px, ${dragY}px, 0)`, touchAction: 'none' }}
      className="relative cursor-grab min-w-[250px] max-w-[300px] min-h-[100px] max-h-[400px]"
    >
      <div {...listeners} {...attributes} className="cursor-grab active:cursor-grabbing">
        <div className="rounded-xl border shadow bg-gray-600 p-3 min-w-[160px]">
          {isEditing ? (
            <div className="flex flex-col">
              <label className={nodeLabel}>
                <p>Edit node Title:</p>
                <input placeholder="Change title"
                  value={draftTitle}
                  onChange={(e) => setDraftTitle(e.target.value)}
                  className="border rounded px-2 py-1 text-sm" />
              </label>

              <label className={nodeLabel}>
                <p>Edit text:</p>
                <input placeholder="Change node text"
                  value={draftText}
                  onChange={(e) => setDraftText(e.target.value)}
                  className="border rounded px-2 py-1 text-sm" />
              </label>

              <label className={nodeLabel}>
                <p>Set Importance:</p>
                <select value={draftImportance}
                  onChange={(e) => setDraftImportance(e.target.value)}
                  className={select}>
                  <option value={'low'}>low</option>
                  <option value={'medium'}>medium</option>
                  <option value={'high'}>high</option>
                  <option value={'critical'}>critical</option>
                </select>
              </label>
              <div>
                <button className={btn} onClick={handleSave}><FiCheck /></button>
              </div>
            </div>
          ) : (
            <>
              <div className="text-sm font-semibold">{node.title || 'Nuevo nodo'}</div>
              <div className="text-sm break-words whitespace-normal text-center">{node.text || "Sin texto"}</div>
              <div className="mt-2 flex items-center gap-2 text-[11px] text-gray-500">
                <span className={tag}>#{node.order}</span>
                <span
                  className={`px-2 py-1 rounded text-xs font-bold ${importanceColors[node.importance] ?? "bg-gray-300 text-black"}`}
                >
                  <FiAlertTriangle className="inline mr-1" />
                  {node.importance || "unset"}
                </span>

                <time className="text-white">{new Date(node.createdDate).toLocaleString()}</time>
              </div>
              <button
                className="absolute top-1 right-1 text-gray-500 hover:text-black"
                onClick={() => setIsEditing(true)}
              >
                <FiEdit2 />
              </button>
              <button
                  className="absolute bottom-1 right-1 text-red-500 hover:text-white"
                  onClick={() => onDelete?.(node.id)}
                  title="Eliminar nodo"
                >
                  🗑️
                </button>
            </>
          )}
        </div>
      </div>

              {freeAnchors.includes('left') && (
          <div
            className="anchor absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-blue-500 cursor-crosshair"
            data-node-id={node.id}
            data-anchor="left"
            onMouseDown={(e) => { e.stopPropagation(); onDragStart(node.id, "left", e); }}
          />
        )}
        {freeAnchors.includes('right') && (
          <div
            className="anchor absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-blue-500 cursor-crosshair"
            data-node-id={node.id}
            data-anchor="right"
            onMouseDown={(e) => { e.stopPropagation(); onDragStart(node.id, "right", e); }}
          />
        )}
        {freeAnchors.includes('top') && (
          <div
            className="anchor absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-blue-500 cursor-crosshair"
            data-node-id={node.id}
            data-anchor="top"
            onMouseDown={(e) => { e.stopPropagation(); onDragStart(node.id, "top", e); }}
          />
        )}
        {freeAnchors.includes('bottom') && (
          <div
            className="anchor absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 rounded-full bg-blue-500 cursor-crosshair"
            data-node-id={node.id}
            data-anchor="bottom"
            onMouseDown={(e) => { e.stopPropagation(); onDragStart(node.id, "bottom", e); }}
          />
        )}
    </div>
  );
};

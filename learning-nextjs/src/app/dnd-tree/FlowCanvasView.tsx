import React, { useEffect, useRef, useState, useCallback } from "react";
import { FlowCanvas, NodeData } from "../types/dndFlowchartTypes";
import { motion, AnimatePresence } from 'framer-motion';
import { DndContext, DragEndEvent, DragMoveEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { btn, card, hidebtn, input, select, tag, tools } from "./customstyle";
import { UseDraggableNode } from "./DraggableNode";
import { getAnchorPosition, uid } from "../helpers/dndFlowchart-helpers";
import { Line, Anchor } from "../types/dndFlowchartTypes";


function getUsedAnchors(nodeId: string, lines: Line[]): Anchor[] {
  const used: Anchor[] = [];
  for (const line of lines) {
    if (line.sourceNode === nodeId) used.push(line.sourceAnchor);
    if (line.targetNode === nodeId) used.push(line.targetAnchor);
  }
  return used;
}

export const FlowCanvasView: React.FC<{
  canvas: FlowCanvas;
  onAddNode: (nodeId: string, at?: { x: number, y: number },
     sourceNodeid?: string, sourceAnchor?: Anchor, targetAnchor?: Anchor) => void;
  onUpdateNodePos: (
    canvasId: string,
    nodeId: string,
    newPos: { x: number, y: number }
  ) => void;
  onRename: (nodeId: string, name: string) => void;
  onChangeImportance: (nodeId: string, importance: string) => void;
  onUpdate: (canvasId: string, nodeId: string, updates: Partial<NodeData>) => void;
  onUpdateCanvas?: (canvasId: string, updates: Partial<FlowCanvas>) => void;
  onDeleteNode : (canvasId: string, nodeId: string) => void
}> = ({ canvas,  onAddNode, onRename, onUpdateNodePos,
   onChangeImportance, onUpdate, onUpdateCanvas, onDeleteNode  }) => {

    //refs
    const containerRef = useRef<HTMLDivElement | null>(null);
    const nodeRef = useRef<Record<string, HTMLDivElement | null>>({});
    const nodeSizesRef = useRef<Record<string, { width: number; height: number }>>({});
    const isPanningRef = useRef(false);
    const lastMousePosRef = useRef({ x: 0, y: 0 });
    const [, setNodeSizesVersion] = useState(0); // incrementa solo cuando cambian tamaños

    //consts
    const [dragVisualOffsets, setDragVisualOffsets] = useState<Record<string, { x: number, y: number }>>({});
    const [pan, setPan] = useState(() => {
    const parentWidth = window.innerWidth;
    const parentHeight = window.innerHeight;
    const canvasWidth = 4000;
    const canvasHeight = 4000;
    const initialX = (parentWidth - canvasWidth) / 2;
    const initialY = (parentHeight - canvasHeight) / 2;
    return { x: initialX, y: initialY };
  });
    const [zoom, setZoom] = useState(1);
    const [tempLineScreen, setTempLineScreen] = useState<{ start: { x: number, y: number }, end: { x: number, y: number } } | null>(null);
    const [pendingConn, setPendingConn] = useState<{ sourceNode: string; sourceAnchor: 'top' | 'right' | 'bottom' | 'left' } | null>(null);

    //const - condicionales
    const [addingNode, setAddingNodes] = useState(false);
    const [isCreatingLine, setIsCreatingLine] = useState(false);


    const convertToScreenCoords = useCallback((canvasX: number, canvasY: number) => {
      return { x: canvasX * zoom + pan.x, y: canvasY * zoom + pan.y };
    }, [zoom, pan]);

    const convertScreenToCanvas = useCallback((screenX: number, screenY: number) => {
      return { x: (screenX - pan.x) / zoom, y: (screenY - pan.y) / zoom };
    }, [zoom, pan]);

    function lerp(a: {x:number,y:number}, b:{x:number,y:number}, t:number){
      return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
    }
    
    const checkCollision = (movingNode: NodeData, newPos: { x: number, y: number }) => {
    // toma tamaños reales si las tenemos
    const movingSize = nodeSizesRef.current[movingNode.id] ?? { width: 250, height: 100 };

    for (const otherNode of canvas.nodes) {
      if (otherNode.id === movingNode.id) continue;
      const otherSize = nodeSizesRef.current[otherNode.id] ?? { width: 250, height: 100 };

      const otherLeft = otherNode.position.x;
      const otherTop = otherNode.position.y;
      const otherRight = otherLeft + otherSize.width;
      const otherBottom = otherTop + otherSize.height;

      const movingLeft = newPos.x;
      const movingTop = newPos.y;
      const movingRight = movingLeft + movingSize.width;
      const movingBottom = movingTop + movingSize.height;

      const isOverlapping = (
        movingLeft < otherRight &&
        movingRight > otherLeft &&
        movingTop < otherBottom &&
        movingBottom > otherTop
      );

      if (isOverlapping) return true;
    }
    return false;
  };

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const newZoom = Math.min(Math.max(zoom + (e.deltaY > 0 ? -0.1 : 0.1), 0.5), 2);
    const scale = newZoom / zoom;
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const newPanX = mouseX - (mouseX - pan.x) * scale;
    const newPanY = mouseY - (mouseY - pan.y) * scale;
    setZoom(newZoom);
    setPan({ x: newPanX, y: newPanY });
  }, [zoom, pan]);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));

  const handleDnDDragStart = useCallback(() => {
    // placeholder
  }, []);

  // memoizados para evitar recreaciones constantes
  const handleDragMove = useCallback((evt: DragMoveEvent) => {
    if (!evt.active) {
      setDragVisualOffsets({});
      return;
    }
    const id = String(evt.active.id);
    const node = canvas.nodes.find((n: NodeData) => n.id === id)
      if(node){
        const newPos = {
          x: node.position.x + (evt.delta.x / zoom),
          y: node.position.y + (evt.delta.y / zoom)
        }
      
      if(checkCollision(node, newPos)){
        return
      }
    }
    // guardamos delta en pantalla; lo convertiremos a canvas cuando lo usemos (/zoom)

  }, [canvas.nodes, zoom, checkCollision]);

  const handleDragEnd = useCallback((evt: DragEndEvent) => {
    const id = String(evt.active?.id ?? "");
    const { delta } = evt;
    if (!id) {
      setDragVisualOffsets({});
      return;
    }
    const node = canvas.nodes.find((n: NodeData) => n.id === id);
    if (node) {
      // delta -> convertir a canvas units (dividiendo por zoom)
      const newPos = {
        x: node.position.x + (delta.x / zoom),
        y: node.position.y + (delta.y / zoom)
      };
      if (!checkCollision(node, newPos)) {
        onUpdateNodePos(canvas.id, id, newPos);
      }
    }
    setDragVisualOffsets({});
  }, [canvas.nodes, onUpdateNodePos, canvas.id, zoom]);

  const handleMouseDown = useCallback((e: MouseEvent) => {
    const targetElement = e.target as HTMLElement;
    if (e.button === 0 && !targetElement.closest('.cursor-grab') && !targetElement.closest('.anchor')) {
      isPanningRef.current = true;
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    }
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    e.preventDefault()
    if (isPanningRef.current) {
      const deltaX = e.clientX - lastMousePosRef.current.x;
      const deltaY = e.clientY - lastMousePosRef.current.y;
      setPan(prev => ({ x: prev.x + deltaX, y: prev.y + deltaY }));
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    } else if (isCreatingLine) {
      // temp line overlay usa screen coords
      setTempLineScreen(prev => prev ? ({ ...prev, end: { x: e.clientX, y: e.clientY } }) : null);
    }
  }, [isCreatingLine]);

  function getClosestAnchor(
  nodePos: { x: number, y: number },
  nodeSize: { width: number, height: number },
  point: { x: number, y: number }
): Anchor {
  const anchors: { anchor: Anchor, x: number, y: number }[] = [
    { anchor: "left",   x: nodePos.x, y: nodePos.y + nodeSize.height / 2 },
    { anchor: "right",  x: nodePos.x + nodeSize.width, y: nodePos.y + nodeSize.height / 2 },
    { anchor: "top",    x: nodePos.x + nodeSize.width / 2, y: nodePos.y },
    { anchor: "bottom", x: nodePos.x + nodeSize.width / 2, y: nodePos.y + nodeSize.height },
  ];
  let minDist = Infinity;
  let closest: Anchor = "left";
  for (const a of anchors) {
    const dx = a.x - point.x;
    const dy = a.y - point.y;
    const dist = dx * dx + dy * dy;
    if (dist < minDist) {
      minDist = dist;
      closest = a.anchor;
    }
  }
  return closest;
}

function getOppositeAnchor(anchor: Anchor): Anchor {
  switch (anchor) {
    case "left": return "right";
    case "right": return "left";
    case "top": return "bottom";
    case "bottom": return "top";
  }
}

function getAnchorOffset(anchor: Anchor, nodeSize: { width: number, height: number }) {
  switch (anchor) {
    case "left":
      return { x: 0, y: nodeSize.height / 2 };
    case "right":
      return { x: nodeSize.width, y: nodeSize.height / 2 };
    case "top":
      return { x: nodeSize.width / 2, y: 0 };
    case "bottom":
      return { x: nodeSize.width / 2, y: nodeSize.height };
  }
}

const handleMouseUp = useCallback((e: MouseEvent) => {
  isPanningRef.current = false;
  if (isCreatingLine && pendingConn) {
    const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
    const anchorEl = el?.closest('.anchor') as HTMLElement | null;
    if (anchorEl) {
      const targetNode = anchorEl.dataset.nodeId;
      const anchor = anchorEl.dataset.anchor as 'top' | 'right' | 'bottom' | 'left' | undefined;
      if (targetNode && anchor && !(targetNode === pendingConn.sourceNode && anchor === pendingConn.sourceAnchor)) {
        const prev = canvas.lines ?? [];
        const exists = prev.some(
          l =>
            (l.sourceNode === pendingConn.sourceNode && l.targetNode === targetNode) ||
            (l.sourceNode === targetNode && l.targetNode === pendingConn.sourceNode)
        );
        if (exists) return;
        const sourceAlreadySource = prev.some(l => l.sourceNode === pendingConn.sourceNode);
        const targetAlreadySource = prev.some(l => l.sourceNode === targetNode);
        if (sourceAlreadySource || targetAlreadySource) return;
        const newLines = [
          ...prev,
          {
            id: uid(),
            sourceNode: pendingConn.sourceNode,
            targetNode,
            sourceAnchor: pendingConn.sourceAnchor,
            targetAnchor: anchor
          }
        ];
        if (onUpdateCanvas) {
          onUpdateCanvas(canvas.id, { lines: newLines });
        }
      }
    } else{
      if (onAddNode) {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        const canvasX = (e.clientX - rect.left - pan.x) / zoom;
        const canvasY = (e.clientY - rect.top - pan.y) / zoom;

        // Suponiendo tamaño estándar del nodo nuevo:
        const nodeSize = { width: 250, height: 100 };
        const dropPoint = { x: canvasX, y: canvasY };
        const targetAnchor = getOppositeAnchor(pendingConn.sourceAnchor)
        const anchorOffset = getAnchorOffset(targetAnchor, nodeSize);

          const nodePos = {
            x: dropPoint.x - anchorOffset.x,
            y: dropPoint.y - anchorOffset.y
          };

          onAddNode(
            canvas.id,
            nodePos,
            pendingConn.sourceNode,
            pendingConn.sourceAnchor,
            targetAnchor
          )
        }
    }
  }
  setIsCreatingLine(false);
  setTempLineScreen(null);
  setPendingConn(null);
}, [isCreatingLine, pendingConn, canvas.lines, canvas.id, onUpdateCanvas]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    el.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      el.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      el.removeEventListener("wheel", handleWheel);
    };
  }, [handleMouseDown, handleMouseMove, handleMouseUp, handleWheel]);

  // Inicia la línea desde un anchor
  const handleLineDragStart = useCallback((nodeId: string, anchor: "top" | "right" | "bottom" | "left", e: React.MouseEvent) => {
    e.stopPropagation();
    setIsCreatingLine(true);
    setPendingConn({ sourceNode: nodeId, sourceAnchor: anchor });
    const node = canvas.nodes.find((n: NodeData) => n.id === nodeId);
    const nodeEl = nodeRef.current[nodeId];
    if (!node || !nodeEl) return;

    const size = nodeSizesRef.current[nodeId] ?? { width: nodeEl.offsetWidth, height: nodeEl.offsetHeight };
    const anchorCanvasPos = getAnchorPosition(node, anchor, size);
    // temporal overlay: el start debe ser screen coords
    const startPointScreen = convertToScreenCoords(anchorCanvasPos.x, anchorCanvasPos.y);
    setTempLineScreen({ start: startPointScreen, end: { x: e.clientX, y: e.clientY } });
  }, [canvas.nodes, convertToScreenCoords]);


  const handleAddNode = useCallback((nodeId: string) => {
    const viewportCenterX = window.innerWidth / 2;
    const viewportCenterY = window.innerHeight / 2;
    const canvasX = (viewportCenterX - pan.x) / zoom;
    const canvasY = (viewportCenterY - pan.y) / zoom;
    const nodeWidth = 200;
    const nodeHeight = 150;
    const finalX = canvasX - (nodeWidth / 2);
    const finalY = canvasY - (nodeHeight / 2);
    onAddNode(canvas.id, { x: finalX, y: finalY });
  }, [onAddNode, canvas.id, pan, zoom]);

  const handleBackgroundDoubleClick = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const canvasX = (e.clientX - rect.left - pan.x) / zoom;
    const canvasY = (e.clientY - rect.top - pan.y) / zoom;
    onAddNode(canvas.id, { x: canvasX, y: canvasY });
  };

  // helper: cuando montamos cada nodo guardamos su tamaño en nodeSizesRef
const setNodeWrapperRef = useCallback((id: string, el: HTMLDivElement | null) => {
  nodeRef.current[id] = el;
    if(!el) return;
    const ro = new ResizeObserver(entries =>{
      for (const entry of entries){
        const cr = entry.contentRect;
        const prev = nodeSizesRef.current[id]
        if(!prev || prev.width !== cr.width || prev.height !== cr.height){
          nodeSizesRef.current[id] = {width: cr.width, height: cr.height};
        }
      }
    });
    ro.observe(el)
    return () => ro.disconnect();
}, []);



    const nodeMap = React.useMemo(() => {
    const map = new Map<string, NodeData>();
    for (const n of canvas.nodes) map.set(n.id, n);
    return map;
    }, [canvas.nodes]);

  const handleDeleteLine = useCallback((lineId: string) =>{
    const next = (canvas.lines ?? []).filter(l => l.id === lineId);
    onUpdateCanvas?.(canvas.id, {lines: next});
  },[canvas.id, canvas.lines, onUpdateCanvas])

    const handleDetachEndpoint = useCallback((line: Line, which : 'source' | 'target') =>{
    const next = (canvas.lines).filter(l => l.id === line.id);
    onUpdateCanvas?.(canvas.id, {lines: next})

    //El extremo que quede fijo puede ser el source de un nuevo nodo, sea desde el target o desde el anchor.
    const fixedNodeId = which === 'source' ? line.targetNode : line.sourceNode;
    const fixedAnchorId = which === 'source' ? line.targetAnchor : line.sourceAnchor; 

    //Busca un nodo y toma las proporciones en el cliente usando los refs establecidos, si no hay refs usara un tamaño predeterminado
    const fixedNode = canvas.nodes.find(n => n.id === fixedNodeId);
    const fixedEl = nodeRef.current[fixedNodeId];
    const size = nodeSizesRef.current[fixedNodeId] ?? {
      width: fixedEl?.offsetWidth ?? 250,
      height: fixedEl?.offsetHeight ?? 100
    }

    //Si no hay nodo con la id del fixedNodeId se hace return
    if(!fixedNode) return;

    //Establecemos donde crear el nodo usando startCanvas y lo posicionamos bien en el cliente usando startScreen
    const startCanvas = getAnchorPosition(fixedNode, fixedAnchorId, size)
    const startScreen = convertToScreenCoords(startCanvas.x, startCanvas.y)

    //Creamos el svg temporal
    setPendingConn({sourceNode: fixedNodeId, sourceAnchor: fixedAnchorId })
    setTempLineScreen({start: startScreen, end:startScreen})
    setIsCreatingLine(true)

  },[canvas.id, canvas.nodes, canvas.lines, onUpdate, convertToScreenCoords])

const renderedLines = React.useMemo(() => {
  return (canvas.lines ?? []).map((line, idx) => {
    const sourceNode = nodeMap.get(line.sourceNode);
    const targetNode = nodeMap.get(line.targetNode);
    if (!sourceNode || !targetNode) return null;

    const sourceSize = nodeSizesRef.current[line.sourceNode] ?? { width: 250, height: 100 };
    const targetSize = nodeSizesRef.current[line.targetNode] ?? { width: 250, height: 100 };

    let sourcePos = getAnchorPosition(sourceNode, line.sourceAnchor, sourceSize);
    let targetPos = getAnchorPosition(targetNode, line.targetAnchor, targetSize);

    if (dragVisualOffsets[line.sourceNode]) {
      sourcePos = {
        x: sourcePos.x + dragVisualOffsets[line.sourceNode].x / zoom,
        y: sourcePos.y + dragVisualOffsets[line.sourceNode].y / zoom,
      };
    }
    if (dragVisualOffsets[line.targetNode]) {
      targetPos = {
        x: targetPos.x + dragVisualOffsets[line.targetNode].x / zoom,
        y: targetPos.y + dragVisualOffsets[line.targetNode].y / zoom,
      };
    }

    const mid = lerp(sourcePos, targetPos,0.5);
    const nearSrc = lerp(sourcePos, targetPos, 0.2);
    const nearTgt = lerp(sourcePos, targetPos, 0.8);

    return (
      <g key={line.id} style={{pointerEvents: 'auto'}}>
        <line
        x1={sourcePos.x} y1={sourcePos.y}
        x2={targetPos.x} y2={targetPos.y}
        stroke="white" strokeWidth={2}
        pointerEvents='none'/>

        <circle 
        cx={mid.x} cy={mid.y} r={8}
        fill="222" stroke="white" strokeWidth={1}
        onClick={() => handleDeleteLine(line.id)}
        style={{cursor:'pointer'}}/>

        <rect 
        x={nearSrc.x -6 } y={nearSrc.y - 6} width={12} height={12} rx={2}
        fill="222" stroke="withe" strokeWidth={1}
        onMouseDown={(e) => {e.stopPropagation(); handleDetachEndpoint(line, 'source')}}
        style={{cursor:'pointer'}}/>
        <rect 
        x={nearTgt.x - 6} y={nearTgt.y - 6} width={22} height={12} rx={2}
        fill="22" stroke="white" strokeWidth={1}
        onMouseDown={(e) => {e.stopPropagation(); handleDetachEndpoint(line, 'target')}}
        style={{cursor:'pointer'}}/>
      </g>
    );
  });
}, [canvas.lines, nodeMap, dragVisualOffsets, zoom, handleDeleteLine, handleDetachEndpoint]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-neutral-900">
      <AnimatePresence mode='wait'>
        {!addingNode ? (
          <motion.button
            key="NodeMenuHidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={hidebtn}
            onClick={() => setAddingNodes(true)}
          >+</motion.button>
        ) : (
          <motion.div key="ShowingNodeMenu" 
           initial={{ opacity: 0, height: 0, width: 0 }}
           animate={{ opacity: 1, height: 260, width: 250, transition: { duration: 0.2 } }} 
           exit={{ opacity: 0, height: 0, width: 0, transition: { duration: 0.2, delay: 0.2 } }} 
           className={card}>
            <motion.div className="flex flex-col items-start gap-2"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1, transition: { duration: 0.2, delay: 0.2 } }} 
             exit={{ opacity: 0, transition: { duration: 0.2 } }}>
              <input className={input} style={{ width: 200 }} value={canvas.name}
               onChange={(e) => onRename(canvas.id, e.target.value)} />
              <select value={canvas.importance}
               onChange={(e) => onChangeImportance(canvas.id, e.target.value)} className={select}>
                <option value={'low'}>Low</option>
                <option value={'medium'}>Medium</option>
                <option value={'high'}>High</option>
                <option value={'critical'}>Critical</option>
              </select>
              <span className={tag}>Nodes: {canvas.nodes.length}</span>
            </motion.div>
            <motion.div className={tools} initial={{ opacity: 0 }}
             animate={{ opacity: 1, transition: { duration: 0.2, delay: 0.2 } }} 
             exit={{ opacity: 0, transition: { duration: 0.2 } }}>
              <button className={btn} onClick={() => handleAddNode(canvas.id)}>Add Node +</button>
            </motion.div>
            <motion.div style={{ justifyContent: "flex-end" }} 
            className={tools} initial={{ opacity: 0 }} 
            animate={{ opacity: 1, transition: { duration: 0.2, delay: 0.2 } }} 
            exit={{ opacity: 0, transition: { duration: 0.2 } }}>
              <button className={btn} onClick={() => setAddingNodes(false)}>^</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <DndContext sensors={sensors} onDragStart={handleDnDDragStart} onDragMove={handleDragMove} onDragEnd={handleDragEnd}>
        <div
          ref={containerRef}
          onDoubleClick={handleBackgroundDoubleClick}
          style={{
            width: "4000px",
            height: "4000px",
            background: 'linear-gradient(90deg, #3B3B3B 10px, transparent 1px), linear-gradient(180deg, #3B3B3B 10px, transparent 1px)',
            backgroundSize: '20px 20px',
            cursor: isCreatingLine ? 'crosshair' : (isPanningRef.current ? 'grabbing' : 'grab')
          }}
          className="absolute rounded-xl border"
        >
          <div
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: '0 0',
              position: 'relative',
              width: "4000px",
              height: "4000px"
            }}
          >
            <svg className="absolute inset-0 pointer-events-auto" width="4000" height="4000">
              {renderedLines}
            </svg>

            {canvas.nodes.map((n: NodeData) => {
              return (
                <div key={n.id}
                  ref={(el) => setNodeWrapperRef(n.id, el)}
                  style={{ position: 'absolute', left: n.position.x, top: n.position.y }}>
                  <UseDraggableNode
                    key={n.id}
                    node={n}
                    onUpdate={(id, updates) => onUpdate(canvas.id, id, updates)}
                    onDragStart={handleLineDragStart} // inicia la línea desde anchor
                    onDragVisualOffset={(id, offset) =>{
                      setDragVisualOffsets(prev => ({...prev, [id]: offset}))
                    }}
                    onDelete={(nodeId) => onDeleteNode?.(canvas.id, nodeId)}
                    lines={canvas.lines}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </DndContext>

      {/* Línea temporal en pantalla (overlay fijo) */}
      {isCreatingLine && tempLineScreen && (
        <svg style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 5 }}>
          <path d={`M${tempLineScreen.start.x} ${tempLineScreen.start.y} L${tempLineScreen.end.x} ${tempLineScreen.end.y}`} stroke="white" strokeWidth="2" strokeDasharray="5,5" fill="none" />
        </svg>
      )}
    </div>
  );
};

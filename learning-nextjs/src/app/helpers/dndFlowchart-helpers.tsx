import { useCallback } from "react";
import { NodeData } from "../types/dndFlowchartTypes";
import { panel } from "../dnd-tree/customstyle";

export const uid= () =>
    typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);


export const nowIso = () =>new Date().toISOString();

export const makeNode = (partial?: Partial<NodeData>): NodeData => ({
    id:uid(),
    title: '',
    text: partial?.text ?? "Nuevo Nodo",
    importance: partial?.importance ?? "low",
    createdDate : partial?.createdDate ?? nowIso(),
    order: typeof partial?.order === "number" ? partial!.order : 1,
    position: partial?.position ?? {x: 40, y: 40},

});

export const getAnchorPosition = (
  node: NodeData | undefined,
  anchor: 'top' | 'right' | 'left' | 'bottom',
  size: {width: number, height: number}
): { x: number; y: number } => {
  if (!node || !node.position) return { x: 0, y: 0 };

  let anchorX = node.position.x;
  let anchorY = node.position.y;

  switch (anchor) {
    case 'top':
      anchorX += size.width/ 2;
      anchorY += 0;

      break;
    case 'right':
      anchorX += size.width
      anchorY += size.height / 2;
      break;
    case 'left':
      anchorX += 0;
      anchorY += size.height / 2;
      break;
    case 'bottom':
      anchorX += size.width / 2;
      anchorY += size.height;
      break;
  }

  return { x: anchorX, y: anchorY };
};
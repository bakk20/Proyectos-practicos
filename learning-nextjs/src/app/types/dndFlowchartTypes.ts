export type NodeData ={
    id: string,
    title: string,
    text:string,
    importance: string | "low" | "medium" | "high" | "critical";
    createdDate: string,
    order:number,
    position: {x: number, y: number};
}
export interface Line {
  id: string,
  sourceNode: string;
  targetNode: string;
  sourceAnchor: 'top' | 'bottom' | 'left' | 'right';
  targetAnchor: 'top' | 'bottom' | 'left' | 'right';
}

export type Anchor = 'top' | 'right' | 'bottom' | 'left';


export type FlowCanvas ={
    id:string,
    importance:string,
    name:string,
    nodes:NodeData[],
    lines:Line[],
    nextOrder:number;
}


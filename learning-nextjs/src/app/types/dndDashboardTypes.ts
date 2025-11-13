export type Item ={
    id: string,
    title: string,
    date?: string,
    description?: string,
    tags?: string[],
    columnId: string,
    dateUpdate?: string,
    dateCreated: string,
    dateFinished?: string
    finished?: boolean
}

export type HistoryEntry ={
    id:string,
    date: string,
    action: 'created' | 'edited' | 'closed' | 'reopened' | 'deleted'
    note?: string
}

export type Columns = Record<string, string[]>;


export interface EditModalProps {
    item: Item;
    onClose: () => void;
    onSave: (updates: Partial<Item>) => void
}

export interface PreviewModalProps{
    item: Item;
    onClose: () => void;
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    onEdit: (id: string) => void;
}

export interface MovePayload{
    card: string,
    from?: string,
    to?: string,
}

export interface AddPayload{
    cardId: string,
    data: Item
}

export type HistoryPayload = {
    item: Item;
    meta?:{
        dateCreated?: string;
        columnId?: string;
        from?: string;
        to?: string;
        fromIndex?: number;
        toIndex?: number;
        note?: string;
        updates?: Partial<Item>;
    }
}


export interface HistoryItem{
    id: string,
    action: string,
    payload: HistoryPayload,
    timestamp: number
}

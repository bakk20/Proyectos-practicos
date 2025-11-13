import { Item, Columns, HistoryItem, HistoryPayload } from '@/app/types/dndDashboardTypes'
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit"

interface Card {
    id:string,
    title:string,
    columnId:string | null,
    history: Record<string, HistoryItem[]>
}

interface Column {
    id:string,
    title:string,
}

interface BoardState{
    columns: Columns,
    items: Record<string, Item>;
    history: Record<string, HistoryItem[]>
}

const initialState: BoardState ={
    columns:{
        '1':[],
        '2':[],
        '3':[],
        '4':[],
    },
    items:{},
    history:{}
}

const boardSlice= createSlice({
    name:'board',
    initialState,
    reducers:{
        addCard:{
        reducer(state, action: PayloadAction<{item:Item}>){
            const {item} = action.payload
            state.items[item.id] = item
            if(!state.columns[item.columnId])
                {state.columns[item.columnId] =[]}

            state.columns[item.columnId].push(item.id)

            state.history[item.id] =[{
                id: nanoid(),
                action: 'create',
                payload: {
                    item,
                    meta: {columnId : item.columnId}
                },
                timestamp: Date.now()
            }]
        },
        prepare(columnId: string, data: Omit<Item, 'id'| 'columnId' | 'dateCreated' | 'dateUpdate'>){
            const id = nanoid();
            const now = new Date().toISOString()
            return{
                payload:{
                    item:{
                        id,
                        columnId,
                        ...data,
                        dateCreated:now,
                        dateUpdate:now
                    } as Item
                }
            }
        }
    },
    moveCard(state, action: PayloadAction<{id: string; from: string; to: string; targetIndex?: number}>){
        const {id, from, to, targetIndex} = action.payload
        const fromArr = state.columns[from];
        const toArr = state.columns[to];
        if(!fromArr || !toArr) return;

        //nota: Estudiar mas a fondo

        //Mover de la columna original
        const idx = fromArr.indexOf(id)
        if(idx !== -1) fromArr.splice(idx,1);

        //Mover a la nueva posicion
        if(typeof targetIndex === 'number'){
            toArr.splice(targetIndex, 0, id);
        }else{
            toArr.push(id)
        }

        //Actualizar columna del item (Sin hacer push de una nueva entry al historial)
        if(state.items[id]){
            state.items[id].columnId = to;
        }
    },
    finalizeMove(state, action: PayloadAction<{id: string, from: string, to: string; fromIndex?: number, toIndex?: number}>){
        const {id, from, to, fromIndex, toIndex} = action.payload
        const fromArr = state.columns[from];
        const toArr = state.columns[to];
        const snapshot = state.items[id] ? {...state.items[id]} : undefined

        if(!fromArr || !toArr){}
        else{
            const idx = fromArr.indexOf(id);
            if(idx !== -1) fromArr.splice(idx, 1);
        }
        if(!toArr.includes(id)){
            if(typeof toIndex === 'number') toArr.splice(toIndex, 0, id);
            else toArr.push(id);
        }
        if(state.items[id]){
            state.items[id].columnId = to;
            state.items[id].dateUpdate = new Date().toISOString();
        }
        if(!state.history[id]) state.history[id] = [];
            state.history[id].push({
            id: nanoid(),
            action: 'move',
            payload: {
                item: snapshot ?? {id , title: 'Desconocido', columnId: '', dateCreated:''},
                meta: { from, to, fromIndex, toIndex }
            },
            timestamp: Date.now()
            });
    },

    updateCard(state, action: PayloadAction<{id: string; updates:Partial<Item>}>){
        const {id, updates} = action.payload
        if(state.items[id]){
            state.items[id] = {...state.items[id], ...updates, dateUpdate: new Date().toISOString()};
        }
        if(!state.history[id]) state.history[id] = []

        state.history[id].push({
            id: nanoid(),
            action:'update',
            payload:{
                item: state.items[id],
                meta: {updates}
            },
            timestamp: Date.now()
        })
    },
    deleteCard(state, action: PayloadAction<string>){
        const id= action.payload;
        const snapshot = state.items[id] ? {...state.items[id]} : undefined;

        delete state.items[id];
        for(const col of Object.values(state.columns)){
            const idx = col.indexOf(id);
            if(idx !== -1) col.splice(idx,1);
        }

        if(!state.history[id]) state.history[id] = []

        state.history[id].push({
            id: nanoid(),
            action:'delete',
            payload:{
                item: snapshot ?? {id, title: 'Desconocido', columnId: '', dateCreated:''},
            },
            timestamp: Date.now()
        })
    },
    archiveCard(state, action: PayloadAction<string>){
        const id = action.payload
        const col = state.items[id].columnId;
        const arr = state.columns[col];
        const snapshot = state.items[id] ? {...state.items[id]} : undefined

        if(state.items[id]){
            state.items[id].finished = true;
            state.items[id].dateFinished = new Date().toISOString();
        }

        if(arr) state.columns[col] = arr.filter(cid => cid !==id);

        if(state.history[id]) state.history[id] = [];
        
        state.history[id].push({
            id: nanoid(),
            action: 'finished',
            payload:{
                item: snapshot ?? {id, title: 'desconocido', columnId: '', dateCreated: ''},
            },
            timestamp: Date.now()
        })
    },

    //Modificaciones al historial (nueva entrada)
    addHistory:{
        reducer(state, action: PayloadAction<{cardId: string, item: HistoryItem}>){
            const {cardId, item} = action.payload;
            if(!state.history[cardId])state.history[cardId] = [];
            state.history[cardId].push(item);
        },
       prepare(cardId: string, actionType: string, payload: HistoryPayload) {
        return {
          payload: {
            cardId,
            item: {
              id: nanoid(),
              action: actionType,
              payload,
              timestamp: Date.now()
            }
          }
        };
      }
    }
 }
})

export const {addCard, moveCard, finalizeMove, updateCard, deleteCard, archiveCard, addHistory} = boardSlice.actions
export default boardSlice.reducer
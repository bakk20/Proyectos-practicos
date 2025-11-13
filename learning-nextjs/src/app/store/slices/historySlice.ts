import { HistoryItem, HistoryPayload } from "@/app/types/dndDashboardTypes"
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit"
interface HistoryState{
    [cardId: string]: HistoryItem[]
} 

const initialState: HistoryState ={}

const historySlice = createSlice({
    name: 'board',
    initialState,
    reducers:{
    addHistory:{
        reducer(state, action: PayloadAction<{cardId: string, item: HistoryItem}>){
            const {cardId, item} = action.payload
            if(!state[cardId]){
                state[cardId] =[]
            }
            state[cardId].push(item)
        }
    ,
        prepare(cardId: string, action: string, payload: unknown){
            return{
                payload:{
                    cardId,
                    item:{
                    id: nanoid(),
                    action,
                    payload,
                    timestamp: Date.now()
                    }
                }
            }
        }
    }
}
})

export const {addHistory} = historySlice.actions
export default historySlice.reducer
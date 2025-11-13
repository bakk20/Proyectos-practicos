import { Item } from "@/app/types/dndDashboardTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CompletedItem{
    id: string,
    title: string,
    date: string,
    description: string,
    CompletedAt: number
}

const initialState: CompletedItem[] = []

const CompletedSlice = createSlice({
    name:'completed',
    initialState,
    reducers:{
        addCompleted(state, action: PayloadAction<CompletedItem>){
            state.push(action.payload)
        },
        removeCompleted(state, action: PayloadAction<string>){
            return state.filter(item => item.id !== action.payload)
        },
        clearCompleted(){
            return[]
        }
    }

})

export const {addCompleted, removeCompleted, clearCompleted} = CompletedSlice.actions
export default CompletedSlice.reducer
import { configureStore } from "@reduxjs/toolkit";
import  authReducer  from "@/app/store/slices/userAuthSlice"
import uiReducer from '@/app/store/slices/UiLoader'
import historyReducer from '@/app/store/slices/historySlice'
import boardReducer from '@/app/store/slices/boardSlice'


export const store = configureStore({
    reducer:{
    ui: uiReducer,
    history: historyReducer,
    board: boardReducer,
    }
})

// Tipos inferidos para TypeScript
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Hooks tipados

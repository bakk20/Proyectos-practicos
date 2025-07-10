import {configureStore} from '@reduxjs/toolkit'
import TodoReducer from './ToDoSlice'

export const Store = configureStore({

    reducer:{
        Todolist: TodoReducer
    }
})
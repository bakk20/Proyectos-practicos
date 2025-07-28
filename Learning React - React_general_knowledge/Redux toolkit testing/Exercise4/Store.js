import {configureStore} from '@reduxjs/toolkit'
import TaskEditorReducer from './TaskEditorSlice'

export const Store = configureStore({

    reducer:{
        TaskEditor: TaskEditorReducer
    }
})
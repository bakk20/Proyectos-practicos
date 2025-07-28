import {createSlice} from '@reduxjs/toolkit'

export const TaskEditorSlice = createSlice ({
    name: 'TaskEditor',
    initialState: { tasks : []},
    reducers:{
        addTask:(state,action) =>{
            state.tasks.push({
                id:Date.now(),
                text: action.payload,
                completed: false
            })
        },
        editTask:(state,action) =>{
            const {id, newText} = action.payload
            const task = state.tasks.find( t => t.id === id)
            if (task){
                task.text= newText
            }
        },
        toggleTask: (state, action) =>{
            const task = state.tasks.find(t = t.id === action.payload)
            if (task) task.completed = !task.completed
        },
        removeTask: (state, action) =>{
            state.tasks = state.tasks.filter( t => t.id !== action.payload)

        }

    }
})

export const {addTask, editTask, toggleTask, removeTask} = TaskEditorSlice.actions
export default TaskEditorSlice.reducer
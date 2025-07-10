import {createSlice} from '@reduxjs/toolkit'

export const ToDoSlice = (createSlice) ({
    name:'Todolist',
    initialState: {tasks: []},
    reducers:{
        addTask: (state,action) =>{
            state.tasks.push({
                id:Date.now(),
                text:action.payload,
                completed:false
            })
        },
        toggleTask:(state, task) =>{
            const task = state.tasks.find(t = t.id === action.payload)
            if (task) task.complete = !task.completed;
        },
        removeTask: (state,task) =>{
            state.tasks = state.tasks.filter(t => t.id !== action.payload)
        }
    }
})
export const {addTask, toggleTask, removeTask} = ToDoSlice.actions
export default ToDoSlice.reducer;


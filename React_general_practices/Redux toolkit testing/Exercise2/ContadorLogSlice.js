import {createSlice} from '@reduxjs/toolkit'

export const ContadorLogSlice = createSlice ({

    name: "counterLog",
    initialState: {value : 0},
    history : [],
    reducers:{
        increment: state =>{
            state += 1;
            state.history.push(state.value)},
        decrement: state =>{
            state -= 1;
            state.history.push(state.value)},
        incrementByAmount: (state, action) =>{
            state.value += action.payload;
            state.history.push(state.value)},
        incrementByAmount: (state, action) =>{
            state.value += action.payload;
            state.history.push(state.value)}
    }

})

export const {increment, decrement, incrementByAmount, decrementByAmount} = ContadorLogSlice.actions
export default ContadorLogSlice.reducer
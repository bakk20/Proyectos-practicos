import {createSlice} from '@reduxjs/toolkit'

export const CustomCounterSlice = createSlice ({
    name: 'customCounter',
    initialState: {value : 0},
    reducers:{
        increment: state => {state.value +=1},
        decrement: state => {state.value -=1 },
        incrementByAmount: (state,action) =>{state.value += action.payload},
        decrementByAmount: (state,action) =>{state.value -= action.payload}

    }
    })

export const {increment, decrement, incrementByAmount, decrementByAmount} = CustomCounterSlice.actions
export default  CustomCounterSlice.reducer

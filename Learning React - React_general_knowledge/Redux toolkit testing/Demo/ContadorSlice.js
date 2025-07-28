import {createSlice} from '@reduxjs/toolkit'

export const ContadorSlice =createSlice({
    name: 'Counter',
    initialState : {value : 0},
    reducers: {
        increment: state => {state.value +=1},
        decrement: state => {state.value +=2}
    }
});
//Podemos agregar multiples propiedades al Slice, pero siempre tendra name, initalState y reducers.

export const {increment, decrement} = ContadorSlice.actions;
//Los handlers o actions fuerone establecidas en el Slice, aqui los exportamos
//como actions(o handlers con sintaxis y nombre diferente)
export default ContadorSlice.reducer;
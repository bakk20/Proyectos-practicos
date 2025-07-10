import {configureStore} from '@reduxjs/toolkit'
import contadorReducer from './ContadorSlice';

export const store = configureStore({
    reducer:{
        Counter: contadorReducer
    
    }
})
import {configureStore} from '@reduxjs/toolkit'
import ContadorLogSlice from './ContadorLogSlice'

export const Store = configureStore({
    reducer:{
        counterLog: ContadorLogSlice
    }
})
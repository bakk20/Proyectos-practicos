import { configureStore} from '@reduxjs/toolkit'
import customCounterReducer from './CustomCounterSlice'

export const Store = configureStore({

    reducer:{
        customCounter: customCounterReducer
    }
}) 
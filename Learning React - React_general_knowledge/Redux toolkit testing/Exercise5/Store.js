import {configureStore} from '@reduxjs/toolkit'
import UserReducer from './UserSlice'

export const Store = configureStore ({

    reducer:{
        UserRegistry: UserReducer
    }
})

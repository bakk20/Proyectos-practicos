import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UiLoaderProp{
    isLoading: boolean
    showLogo : boolean
}

const initialState: UiLoaderProp ={
    isLoading: false,
    showLogo:true
}

const UiSlice = createSlice({
    name:'ui',
    initialState,
    reducers:{
        setLoading: (state, action: PayloadAction<boolean>) =>{
            state.isLoading = action.payload
        },
        setShowLogo: (state, action: PayloadAction<boolean>) =>{
            state.showLogo = action.payload
        }

    }
})

export const {setLoading, setShowLogo} = UiSlice.actions
export default UiSlice.reducer
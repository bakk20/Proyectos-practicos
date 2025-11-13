import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios'
import { useLogin } from "@/app/AxiosRoutes/UserRoutes"
import { userLoginModel, User } from "@/app/types/GeneralTypes";


interface authState {
    user : User | null
    token : string | null
    error: string | null
    authenticated : boolean
}

const initialState : authState = {
    user: null,
    token: localStorage.getItem('token'),
    error: null,
    authenticated: !!localStorage.getItem('token')
} 

export const loginthunk = createAsyncThunk<
 { user: User; token: string}, //exito
     userLoginModel, //recibe
 { rejectValue:string} // falla
>(
    "auth/login",
    async (credentials, thunkAPI) =>{
    try{
    const data = await useLogin(credentials)
    return data
    }catch(err: any){
        return thunkAPI.rejectWithValue(err?.message ?? "Error Login")
    }
})



export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
       logout: (state) =>{
        state.user =null
        state.token = null
        state.error = null
        state.authenticated = false
        localStorage.removeItem('token')
       },
    },

    extraReducers: (builder) =>{
        builder
        .addCase(loginthunk.pending, (state) =>{
            state.error = null;
            state.authenticated = false;
        })
        .addCase(loginthunk.fulfilled, (state, action)=>{
            state.authenticated = true
            state.user = action.payload.user
            state.token = action.payload.token
            localStorage.setItem('token',action.payload.token)

        })
        .addCase(loginthunk.rejected, (state, action) =>{
            state.error = action.payload || 'Error inesperado'
        })
    }

})

export const {logout} = authSlice.actions
export default authSlice.reducer
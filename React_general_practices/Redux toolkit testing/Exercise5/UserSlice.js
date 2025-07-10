import {createSlice} from '@reduxjs/toolkit'

export const UserSlice = createSlice ({

    name:'UserRegistry',
    initialState: {users: []},
    reducers:
    {
        addUser: (state, action) =>{
            const {addName, addEmail, addPassword} = action.payload
            state.users.push({
                id:Date.now(),
                name: addName,
                email: addEmail,
                password: addPassword,
                active: true
            })
        },
        editUser: (state, action) =>{
            const {id, newName, newEmail, newPassword } = action.payload
            const user = state.users.find(t => t.id === id)
            if(user){
                user.name= newName
                user.email= newEmail 
                user.password= newPassword
            }
        },
        toggleActive: (state,action) =>{
            const user =state.users.find(t => t.id === action.payload)
            if(user) user.active = !user.active
        },
        removeUser: (state, action) =>{
            const user = state.users.filter(t => t.id !== action.payload)
        }
    }
})

export const {addUser, editUser, toggleActive, removeUser} = UserSlice.actions
export default UserSlice.reducer
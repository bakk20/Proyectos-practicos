import axios from "axios";

export const getUserList = async (token) =>{

    const res = await axios.get('/api/admin/users' , {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }) 

    return res.data
}
export interface userLoginModel{
    email:string,
    password:string    
}

export interface fullUserModel{
    username:string,
    email:string,
    password:string,
}

export interface User{
    email:string,
    password:string
}

export interface loginResponse{
    success: boolean,
    message: string,
    token: string,
    user: User
}

export interface dndItem{
    children?: React.ReactNode
}
export interface loginForm {
  email:string,
  password:string
}

export interface registerForm{
    name:string,
    email:string,
    password:string,
    role: string
}

export interface UserSchema{
    id:string,
    name:string,
    password:string,
    email:string,
    role:string
}
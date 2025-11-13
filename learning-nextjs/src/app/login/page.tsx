
/*'use client'

import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/app/store/hooks"
import { logout} from "@/app/store/slices/userAuthSlice"
import { useLogin } from "./AxiosRoutes/UserRoutes"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function Home({}) {
  
  const dispatch = useAppDispatch()
  const {error, user, authenticated} = useAppSelector((state) => state.auth)
  const {isLoading} = useAppSelector((state) => state.ui)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  useEffect(() => {
    dispatch(logout())
  }, [])
  

  const handleLogin = async (e: React.FormEvent) =>{
    e.preventDefault()
    try{
      const {user, token} = await useLogin({email, password})
      localStorage.setItem('token', token)
      dispatch(loginthunk(user))
    }catch(err: any){
      dispatch(loginFailure(err.message || 'Error en login'))
    }
  }

  useEffect(() => {
  if (authenticated) {
    router.push("/about")
  }
}, [authenticated, router])

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="flex items-center flex-col justify-center p-4 ring-1 h-fit w-fit rounded-2xl ring-neutral-600">
        <div className="ring-1 ring-cyan-950 p-4 rounded-2xl">
      <h1 className="font-title text-4xl">Log in</h1>
              <form className="flex flex-col items-start"
              onSubmit={handleLogin}
               >
                <label>
                  <p>Email</p>
                  <input 
                  type="email"
                  value={email}
                  placeholder="Your email"
                  onChange={(e) => setEmail(e.target.value)}
                 ></input>
                </label>
                <label>
                  <p>Password</p>
                  <input 
                  type="password"
                  value={password}
                  placeholder="Your password"
                  onChange={(e) => setPassword(e.target.value)}
                  ></input>
                </label>
                <button type="submit">Log in</button>
              </form>
              <p>
                   ¿Don't have an account? 
                  <br/>
                 <Link href={'/register'} className="text-cyan-700 hover:underline">Create one here</Link>
              </p>

        </div>
      </div>
    </div>
  )
}
 */
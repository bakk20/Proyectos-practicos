'use client'
import { Provider } from "react-redux";
import {store} from '@/app/store'
import { ReactNode } from "react";

interface ProviderProp{
    children: ReactNode
}

export const Providers = ({children}: ProviderProp) =>{
    return <Provider store={store}> {children}</Provider>

}
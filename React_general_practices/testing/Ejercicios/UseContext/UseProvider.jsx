 import { PasenContexto } from './PasenContexto';
 import {ChangeContext} from './ChangeContext'
 import {ContextHook} from './ContextHook'

 
 export const UseProvider = ({children}) => {
    const {nombre, setNombre} = ContextHook()


   return (
    
    <PasenContexto.Provider value={{nombre, setNombre}}>
        {children}
    </PasenContexto.Provider>
    
   )
 }
 
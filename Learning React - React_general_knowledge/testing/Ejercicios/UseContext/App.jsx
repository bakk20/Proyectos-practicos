import { UseProvider} from './UseProvider'
import {Userjsx} from './Userjsx'
import {ChangeContext} from './ChangeContext'
import {Routes, Route, Link, BrowserRoute} from 'react-router-dom'

function App(){
    return(
        <UseProvider>
            <BrowserRoute>
            <nav>
                <Link path='/'>VerUsuario</Link>
                <Link path='/ChangeName'>CambiarNombre</Link>
            </nav>
            <Routes>
                <Route path='/' element= {<Userjsx/>}></Route>
                <Route path='ChangeName' element= {<ChangeContext/>}></Route>
            </Routes>
            </BrowserRoute>
        </UseProvider>
    )
}
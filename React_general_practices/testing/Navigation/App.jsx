import {Routes, Route, BrowserRouter, Link} from 'react-router-dom'
import {Home} from './Home'
import {Catalog} from './Catalog'

function App({}){
    return(
    <BrowserRouter>
    <nav>
        <Link path='/'>Inicio</Link>
        <Link path='/catalog'>Catalogo</Link>
    </nav>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/catalog' element={<Catalog/>}/>
        </Routes>
    </BrowserRouter>
    )
}
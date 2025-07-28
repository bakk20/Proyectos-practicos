import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {Provider} from 'react-redux'
import {store} from './Store'

//Ok no se como explicar bien esta parte, pero establecemos un root y 
//en este le damos el provider con nuestro Store ya establecido.
//Asi todo el codigo puede usar el reducer dentro del Store.
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
        <App></App>
    </Provider>
)
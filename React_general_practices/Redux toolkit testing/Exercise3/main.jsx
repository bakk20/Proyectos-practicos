import {Store} from './Store'
import {Provider} from 'react-redux'
import ReactDOM from 'react-dom/client'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider Store={Store}>
        <App/>
    </Provider>
)
import App from './App'
import {Store} from './Store'
import ReactDOM from 'react-dom/client'
import {Provider} from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider Store={Store}>
        <App/>
    </Provider>
)
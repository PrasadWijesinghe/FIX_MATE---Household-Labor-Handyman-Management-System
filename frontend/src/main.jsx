import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
<<<<<<< HEAD

ReactDOM.createRoot(document.getElementById('root')).render(
        <App />
=======
import {BrowserRouter} from 'react-router-dom'
import { AppContextProvider } from './Context/AppContext';

ReactDOM.createRoot(document.getElementById('root')).render(
    <AppContextProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </AppContextProvider>
>>>>>>> 1d0a79f8a7f83742971e5aad1a8e6bda3e9570cf
)

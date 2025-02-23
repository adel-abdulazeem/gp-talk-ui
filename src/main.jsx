import { createRoot } from 'react-dom/client'
import './index.css'
import './assets/css/header.css'
import './assets/css/footer.css';
import './assets/css/chatInput.css';
import './assets/css/sideWindow.css';


import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <App />
)

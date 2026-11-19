import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter as Router } from 'react-router-dom'
import ScrollTop from './components/ScrollTop.jsx'
import TopScrollButton from './components/ScrollTopButton.jsx'

createRoot(document.getElementById('root')).render(
    <Router>
    <ScrollTop />
    <TopScrollButton/>
    <App />
    </Router>
)

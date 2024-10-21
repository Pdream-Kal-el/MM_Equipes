import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import MainRoutes from "./routes.jsx"

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <MainRoutes></MainRoutes>
    </BrowserRouter>
)

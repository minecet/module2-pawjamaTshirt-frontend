import { StrictMode } from 'react'
import ReactDOM from "react-dom/client";

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from "react-router-dom"; // <== IMPORT

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router> {/* <== Wrap your app with Router */}
      <App />
    </Router>
  </StrictMode>,
)

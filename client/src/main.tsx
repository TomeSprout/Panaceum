import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <AuthProvider>
          <Route path="/*" element={<App />} />
        </AuthProvider>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)

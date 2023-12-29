import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthProvider from './provider/AuthProvider.jsx'
import DataProvider from './provider/DataProvider.jsx'


 

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <AuthProvider>
      <DataProvider>
        <App />
      </DataProvider>
    </AuthProvider>
  </>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './Components/Context/AuthContext.jsx'
import { ChatContextProvider } from './Components/Context/ChatContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
<AuthContextProvider>
<ChatContextProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ChatContextProvider>
</AuthContextProvider>

 
)

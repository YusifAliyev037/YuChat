import { useContext } from 'react'
import './style.scss'
import ChatBox from './Components/Pages/ChatBox/Home'
import Register from './Components/Pages/Register'
import Login from './Components/Pages/Login'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthContext } from './Components/Context/AuthContext'



function App() {

  const {currentUser} = useContext(AuthContext)

  const ProtectedRoute = ({children}) => {
    if(!currentUser){
      return <Navigate to="/login" />
    }
    return children
  }

  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/' />
    <Route index element={
      <ProtectedRoute>
        <ChatBox />
      </ProtectedRoute>
    } />
    <Route path='login' element={<Login />} />
    <Route path='register' element={<Register />} />

    </Routes>
    </BrowserRouter>
         
    </>
  )
}

export default App

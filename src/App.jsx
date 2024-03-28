import {} from 'react'
import './style.scss'
import {auth} from "./Components/Service/firebase"
import {useAuthState} from "react-firebase-hooks/auth"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Error from './Components/Pages/Error'
import GetStart from './Components/Pages/GetStart'
import Welcome from './Components/Pages/Welcome'
import ChatBox from './Components/Pages/ChatBox/Home'



function App() {

  const [user] = useAuthState(auth)

  return (
    <>
    <GetStart />
    {! user ? <Welcome /> : <ChatBox />}
      {/* <BrowserRouter>
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='*' element={<Error />} />
      </Routes>
      </BrowserRouter> */}
         
    </>
  )
}

export default App

import {} from 'react'
import './style.scss'
import ChatBox from './Components/Pages/ChatBox/Home'
import Register from './Components/Pages/Register'
import Login from './Components/Pages/Login'



function App() {


  return (
    <>
    <Register />
    {/* <Login /> */}
    {/* {! user ?  <GetStart /> : <ChatBox />} */}
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

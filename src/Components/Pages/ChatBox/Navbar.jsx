import { signOut } from 'firebase/auth'
import React from 'react'
import { auth } from '../../Service/firebase'
import { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'

function Navbar() {
 
  const {currentUser} = useContext(AuthContext)

  return (
    <div className='navbar'>

      <span className='logo'>Yu Chat</span>
      <div className='user'>
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={()=>signOut(auth)}  type='button'>Logout</button>

      </div>
    </div>
  )
}

export default  Navbar

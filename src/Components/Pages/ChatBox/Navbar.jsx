import React from 'react'
function Navbar() {
 
 
  return (
    <div className='navbar'>

      <span className='logo'>Yu Chat</span>
      <div className='user'>
        <img src="https://images.pexels.com/photos/16370466/pexels-photo-16370466/free-photo-of-night-photo-of-a-young-man-walking-down-the-street-wearing-blue-jeans-and-a-denim-vest.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" />
        <span>Yusif</span>
        <button   type='button'>Logout</button>

      </div>
    </div>
  )
}

export default  Navbar

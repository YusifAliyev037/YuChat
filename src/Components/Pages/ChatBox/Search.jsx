import React from 'react'

function Search() {
  return (
    <div className='search'>

      <div className="searchform">
        <input type="text" placeholder='Find a user' />
      </div>

      <div className="userchat">
        <img src="https://images.pexels.com/photos/16370466/pexels-photo-16370466/free-photo-of-night-photo-of-a-young-man-walking-down-the-street-wearing-blue-jeans-and-a-denim-vest.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" />
        <div className="userchatinfo">
          <span>Yusif</span>
        </div>
      </div>
      
    </div>
  )
}

export default Search

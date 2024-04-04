import React, { useState } from 'react'
import { IoChevronBackOutline } from "react-icons/io5";
import Sidebar from './Sidebar'
import Chat from './Chat';

 function ChatBox() {
  // const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className='home'>
      <div className='container'>
        <Sidebar />
        <Chat   />
        {/* {isSidebarOpen && <Sidebar />} */}
      </div>
    </div>
  )
}


export default ChatBox

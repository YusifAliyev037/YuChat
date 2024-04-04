import React, { useContext, useState } from 'react'
import { BsCameraVideo } from "react-icons/bs";
import { RiUserAddLine } from "react-icons/ri";
import { IoIosMore } from "react-icons/io";
import Messages from './Messages';
import InputMessage from './InputMessage';
import { ChatContext } from '../../Context/ChatContext';
import { IoChevronBackOutline } from "react-icons/io5";
import Sidebar from './Sidebar';


function Chat() {
  const { data } = useContext(ChatContext);
 
  console.log(data);
  return (
    <div className='chat'>
      <div className="chatinfo">
        <span className='userninfo' >
        <IoChevronBackOutline  style={{cursor:'pointer'}} />
          <img className='useravatar' src={data.user?.photoURL} alt="" />
        
      <span>{data.user?.displayName}</span>
      </span>
        <div className="chaticons">
            <BsCameraVideo cursor="pointer" />
            <RiUserAddLine cursor="pointer" />
            <IoIosMore cursor="pointer" />
        </div>
      </div>
        <Messages/>
        <InputMessage />
    </div>
  )
}

export default Chat

import React from 'react'
import { BsCameraVideo } from "react-icons/bs";
import { RiUserAddLine } from "react-icons/ri";
import { IoIosMore } from "react-icons/io";
import Messages from './Messages';
import InputMessage from './InputMessage';


function Chat() {
  return (
    <div className='chat'>
      <div className="chatinfo">
        <span>Yusif</span>
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

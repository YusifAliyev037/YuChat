import React, { useContext } from 'react'
import { BsCameraVideo } from "react-icons/bs";
import { RiUserAddLine } from "react-icons/ri";
import { IoIosMore } from "react-icons/io";
import Messages from './Messages';
import InputMessage from './InputMessage';
import { ChatContext } from '../../Context/ChatContext';


function Chat() {
  const { data } = useContext(ChatContext);
  return (
    <div className='chat'>
      <div className="chatinfo">
      <span>{data.user?.displayName}</span>
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

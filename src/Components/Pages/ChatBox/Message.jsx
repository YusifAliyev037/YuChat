import React, { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext';
import { ChatContext } from '../../Context/ChatContext';

 function Message({message}) {

  const {currentUser} = useContext(AuthContext)
  const {data} = useContext(ChatContext)
  console.log(message);
  return (
    <div className={`message ${message.senderId === currentUser.uid && "owner"}`}>
      <div className="messageinfo">
        <img 
        src= {message.senderId === currentUser.uid
        ? currentUser.photoURL
        : data.user.photoURL
        }
        alt="" />
        <span>just now</span>
      </div>
      <div className="messagecontent">
        <p>{message.text}</p>
        {message.img && <img 
        src={message.img} 
        alt="" 
        />}
      </div>
      </div>
  )
}

export default Message
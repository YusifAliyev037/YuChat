import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../../Context/AuthContext';
import { ChatContext } from '../../Context/ChatContext';

 function Message({message}) {

  const {currentUser} = useContext(AuthContext)
  const {data} = useContext(ChatContext)
  const ref = useRef()
  useEffect(()=>{
    ref.current?.scrollIntoView({behavior:"smooth"})
  },[message])
  console.log(message);
  return (
    <div ref={ref} className={`message ${message.senderId === currentUser.uid && "owner"}`}>
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
        <p className='ptext'>{message.text}</p>
        <p className='pimage'>{message.img && <img 
        className='mesimage'
        src={message.img} 
        alt="" 
        />}</p>
      </div>
      </div>
  )
}

export default Message
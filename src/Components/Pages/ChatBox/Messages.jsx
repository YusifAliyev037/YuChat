import React, { useContext, useEffect, useRef, useState } from 'react'
import Message from './Message'
import { ChatContext } from '../../Context/ChatContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../Service/firebase'

function Messages() {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  
  

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);
  console.log(messages);

  return (
    <div className='messages'>
      {messages.map((m) => (
        <Message message={m}/>
      ))}
        
    </div>
  )
}

export default  Messages

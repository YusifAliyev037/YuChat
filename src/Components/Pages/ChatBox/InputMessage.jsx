import React from 'react'
import { IoIosAttach } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";

function InputMessage() {
  return (
    <div className='inputmessage'>
      <input type="text" placeholder='Type a message...' />
      <div className="send">
      <IoIosAttach />
        <input type="file" style={{display:"none"}} id="file" />
        <label htmlFor="file">
        <CiImageOn />
        </label>
        <button>Send</button>
      </div>
    </div>
  )
}


export default InputMessage

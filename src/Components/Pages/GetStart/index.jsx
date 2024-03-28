import React, { useState } from 'react'
import {auth} from "../../Service/firebase"
import {useAuthState} from "react-firebase-hooks/auth"
import { GoogleAuthProvider, signInWithRedirect} from "firebase/auth"

export const signOut = () => {
    auth.signOut()
}
function GetStart() {

    const [user] = useAuthState(auth)
    const signIn = () => {
        const provider =  new GoogleAuthProvider();
        signInWithRedirect(auth, provider)
    };
  


  return (
    <> 
    
    {user ? (
        <button className='signout' onClick={signOut} type='button'>Sign Out</button>
    ): (
        <button onClick={signIn} type='button'>Sign In</button>
    )}
   
    
    </>
  )
}

export default GetStart

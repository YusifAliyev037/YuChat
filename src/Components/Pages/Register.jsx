import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from '../Service/firebase';
import { CiImageOn } from "react-icons/ci";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from 'firebase/firestore'; // Importing Firestore related functions
import { Link, useNavigate } from 'react-router-dom';
import { GoEye } from 'react-icons/go';
import { GoEyeClosed } from "react-icons/go";

function Register() {
  const [showPassword, setShowPassword] = useState(false); 
    const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value.trim();
    const email = e.target[1].value.trim();
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              password,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

    return (
        <div className='formcontainer'>
            <div className='formwrapper'>
                <span className='logo'>Yu Chat</span>
                <span className='title'>Register</span>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="displayName" placeholder='Display Name' />
                    <input type="email" name="email" placeholder='Email'/>
                    <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
        />
        <button
          className='passwordbutton'
          type="button"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <GoEye color='black' /> : <GoEyeClosed color="black" />}
        </button> 
                  
                    <input style={{display:"none"}} type="file" id='file' name="file" />
                    <label htmlFor="file"><CiImageOn size={30} /> Add Profile Image</label>
                    <button type="submit">Sign Up</button>
                    {err && <span>Something went wrong</span>}
                </form>
                <p>You already have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    );
}

export default Register;

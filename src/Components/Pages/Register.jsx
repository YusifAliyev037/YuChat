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
    const displayName = e.target.displayName.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;
    const file = e.target.file.files[0];

    try {
      // Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            // Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

            // Create user on Firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              password,
              photoURL: downloadURL,
            });

            // Create empty user chats on Firestore
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
      console.log(err);
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
          <div className="password-input-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              name="password"
            />
            <button
              className='passwordbutton'
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <GoEye color='black'  /> : <GoEyeClosed color="black" /> }  
            </button>
          </div>
          <input style={{display:"none"}} type="file" id='file' name="file" />
          <label htmlFor="file"><CiImageOn size={30} /> Add Profile Image</label>
          <button type="submit">Sign Up</button>
          {err && <span className="error-message">Something went wrong. Please try again.</span>}
        </form>
        <p>You already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}

export default Register;

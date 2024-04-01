import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from '../Service/firebase';
import { CiImageOn } from "react-icons/ci";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from 'firebase/firestore'; // Importing Firestore related functions
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const [err, setErr] = useState(false);
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target.elements.displayName.value;
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
        const file = e.target.elements.file.files[0];

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);

            const storageRef = ref(storage, displayName);

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                (error) => {
                    setErr(true);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL
                        });

                        await setDoc(doc(db, 'users', res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            password,
                            photoURL: downloadURL
                        });
                        await setDoc(doc(db, "userChats", res.user.uid), {})
                        navigate("/")
                    });
                }
            );
        } catch (err) {
            setErr(true);
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
                    <input type="password" name="password" placeholder='Password' />
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

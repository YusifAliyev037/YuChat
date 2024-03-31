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
            // Create user with email and password
            const res = await createUserWithEmailAndPassword(auth, email, password);

            // Create a reference to the user's storage location using their display name
            const storageRef = ref(storage, displayName);

            // Upload the file to storage
            const uploadTask = uploadBytesResumable(storageRef, file);

            // Handle errors during upload
            uploadTask.on(
                (error) => {
                    setErr(true);
                },
                () => {
                    // Once upload is complete, get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        // Update user profile with display name and profile image URL
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL
                        });

                        // Add user data to Firestore
                        // Here's where you set the document in the 'users' collection
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

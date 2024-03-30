import React, { useState, useEffect } from 'react';
import { auth, db, storage } from '../../Service/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { GoogleAuthProvider, signInWithRedirect, updateProfile } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export const signOut = () => {
    auth.signOut();
};

function GetStart() {
    const [user] = useAuthState(auth);
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        if (user) {
            // Retrieve user profile when user is authenticated
            getUserProfile(user.uid);
        } else {
            // Reset user profile when user signs out
            setUserProfile(null);
        }
    }, [user]);

    const signIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider);
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0]; // Assuming only one file is selected
        const storageRef = ref(storage, user.uid + '/' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                // Handle progress, if needed
            },
            (error) => {
                // Handle error
                console.error(error);
            },
            () => {
                // Handle successful upload
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    await updateProfile(user, { photoURL: downloadURL });
                });
            }
        );
    };

    const createUserProfile = async (userId, userData) => {
        try {
            const userRef = doc(db, 'users', userId);
            await setDoc(userRef, userData);
        } catch (error) {
            console.error('Error creating user profile:', error);
        }
    };

    const getUserProfile = async (userId) => {
        try {
            const userDoc = await getDoc(doc(db, 'users', userId));
            if (userDoc.exists()) {
                setUserProfile(userDoc.data());
            } else {
                // If user profile doesn't exist, create it
                const userData = {
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    // Add other user data as needed
                };
                createUserProfile(userId, userData);
                setUserProfile(userData);
            }
        } catch (error) {
            console.error('Error getting user profile:', error);
        }
    };

    return (
        <>
            {user ? (
                <div>
                    <button className='signout' onClick={signOut} type='button'>
                        Sign Out
                    </button>
                    <input type='file' onChange={handleFileUpload} />
                    
                </div>
            ) : (
                <button onClick={signIn} type='button'>
                    Sign In
                </button>
            )}
        </>
    );
}

export default GetStart;

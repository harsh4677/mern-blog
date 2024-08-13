// import React from 'react'
// import {GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth'
// import { app } from '../firebase';
// import { useDispatch } from 'react-redux';
// import { signInSuccess } from '../redux/user/userSlice'
// import { useNavigate } from 'react-router-dom'

// export default function OAuth() {
//   const dispatch = useDispatch()
//   const navigate = useNavigate()


//   const handleGoogleClick = async () =>{
//     const auth = getAuth(app)
//     const provider = new GoogleAuthProvider()
//     provider.setCustomParameters({prompt: 'select_account'})  // Corrected spelling

//     try{
//           const resultFromGoogle  = await signInWithPopup(auth, provider)
//           const res = await fetch('/api/auth/google',{
//             method: 'POST',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify({
//               name: resultFromGoogle.user.displayName,
//               email: resultFromGoogle.user.email,
//               googlePhotoUrl: resultFromGoogle.user.photoURL,
//             }),
//           })
//           const data = await res.json()
//           if(res.ok){
//             dispatch(signInSuccess(data))
//             navigate('/')
//           }
//         }catch (error){
//           console.error('Error during Google sign-in:', error);
//         }
//     }


//     return (
//     <div className='mt-8 flex flex-col gap-y-4'>
//        <button
//         className='flex items-center justify-center gap-2 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out transform py-4 rounded-xl text-gray-700 font-semibold text-lg border-2 border-gray-100'
//         onClick={handleGoogleClick}>
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M5.26644 9.76453C6.19903 6.93863 8.85469 4.90909 12.0002 4.90909C13.6912 4.90909 15.2184 5.50909 16.4184 6.49091L19.9093 3C17.7821 1.14545 15.0548 0 12.0002 0C7.27031 0 3.19799 2.6983 1.24023 6.65002L5.26644 9.76453Z" fill="#EA4335"/>
//                 <path d="M16.0406 18.0142C14.9508 18.718 13.5659 19.0926 11.9998 19.0926C8.86633 19.0926 6.21896 17.0785 5.27682 14.2695L1.2373 17.3366C3.19263 21.2953 7.26484 24.0017 11.9998 24.0017C14.9327 24.0017 17.7352 22.959 19.834 21.0012L16.0406 18.0142Z" fill="#34A853"/>
//                 <path d="M19.8342 20.9978C22.0292 18.9503 23.4545 15.9019 23.4545 11.9982C23.4545 11.2891 23.3455 10.5255 23.1818 9.81641H12V14.4528H18.4364C18.1188 16.0119 17.2663 17.2194 16.0407 18.0108L19.8342 20.9978Z" fill="#4A90E2"/>
//                 <path d="M5.27698 14.2663C5.03833 13.5547 4.90909 12.7922 4.90909 11.9984C4.90909 11.2167 5.03444 10.4652 5.2662 9.76294L1.23999 6.64844C0.436587 8.25884 0 10.0738 0 11.9984C0 13.918 0.444781 15.7286 1.23746 17.3334L5.27698 14.2663Z" fill="#FBBC05"/>
//             </svg>
//             Sign Up with Google
//         </button>
//     </div>
//   )
// }

// import React from 'react'
// import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
// import { app } from '../firebase';
// import { useDispatch } from 'react-redux';
// import { signInSuccess } from '../redux/user/userSlice'
// import { useNavigate } from 'react-router-dom'

// export default function OAuth() {
//     const dispatch = useDispatch()
//     const navigate = useNavigate()

//     const handleGoogleClick = async () => {
//         const auth = getAuth(app)
//         const provider = new GoogleAuthProvider()
//         provider.setCustomParameters({ prompt: 'select_account' })  

//         try {
//             const resultFromGoogle = await signInWithPopup(auth, provider)
//             const res = await fetch('/api/auth/google', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({
//                     name: resultFromGoogle.user.displayName,
//                     email: resultFromGoogle.user.email,
//                     googlePhotoUrl: resultFromGoogle.user.photoURL,
//                 }),
//             })
//             const data = await res.json()
//             if (res.ok) {
//                 dispatch(signInSuccess(data))
//                 navigate('/')
//             }
//         } catch (error) {
//             console.error('Error during Google sign-in:', error);
//         }
//     }

//     return (
//         <div className='mt-8 flex flex-col gap-y-4'>
//             <button
//                 className='flex items-center justify-center gap-2 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out transform py-4 rounded-xl text-gray-700 font-semibold text-lg border-2 border-gray-100'
//                 onClick={handleGoogleClick}>
//                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M5.26644 9.76453C6.19903 6.93863 8.85469 4.90909 12.0002 4.90909C13.6912 4.90909 15.2184 5.50909 16.4184 6.49091L19.9093 3C17.7821 1.14545 15.0548 0 12.0002 0C7.27031 0 3.19799 2.6983 1.24023 6.65002L5.26644 9.76453Z" fill="#EA4335" />
//                     <path d="M16.0406 18.0142C14.9508 18.718 13.5659 19.0926 11.9998 19.0926C8.86633 19.0926 6.21896 17.0785 5.27682 14.2695L1.2373 17.3366C3.19263 21.2953 7.26484 24.0017 11.9998 24.0017C14.9327 24.0017 17.7352 22.959 19.834 21.0012L16.0406 18.0142Z" fill="#34A853" />
//                     <path d="M19.8342 20.9978C22.0292 18.9503 23.4545 15.9019 23.4545 11.9982C23.4545 11.2891 23.3455 10.5255 23.1818 9.81641H12V14.4528H18.4364C18.1188 16.0119 17.2663 17.2194 16.0407 18.0108L19.8342 20.9978Z" fill="#4A90E2" />
//                     <path d="M5.27698 14.2663C5.03833 13.5547 4.90909 12.7922 4.90909 11.9984C4.90909 11.2167 5.03444 10.4652 5.2662 9.76294L1.23999 6.64844C0.436587 8.25884 0 10.0738 0 11.9984C0 13.918 0.444781 15.7286 1.23746 17.3334L5.27698 14.2663Z" fill="#FBBC05" />
//                 </svg>
//                 Sign Up with Google
//             </button>
//         </div>
//     )
// }

import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
    const auth = getAuth(app);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider);
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: resultsFromGoogle.user.displayName,
                    email: resultsFromGoogle.user.email,
                    googlePhotoUrl: resultsFromGoogle.user.photoURL,
                }),
            });
            const data = await res.json();
            if (res.ok) {
                dispatch(signInSuccess(data));
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <button
            type='button'
            onClick={handleGoogleClick}
            className="flex items-center px-4 py-2 rounded-md border border-transparent shadow-sm text-base font-medium text-white bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
        >
            <AiFillGoogleCircle className='w-6 h-6 mr-2' />
            Continue with Google
        </button>
    );
}

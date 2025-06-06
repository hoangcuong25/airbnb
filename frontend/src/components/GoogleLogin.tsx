/* eslint-disable @typescript-eslint/no-explicit-any */

import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import app from "@/firebase.js"
import { FcGoogle } from "react-icons/fc"
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { LoginWithGoogle } from '@/api/auth.api';
import { useContext } from 'react';
import { AppContext } from '@/context/AppContext';

const GoogleLogin = () => {

    const { fetchUser } = useContext(AppContext)

    const router = useRouter()

    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);

            const name = result.user.displayName ?? "";
            const email = result.user.email ?? "";
            const avatar = result.user.photoURL ?? "";

            const payload = {
                name,
                email,
                avatar
            }

            const response = await LoginWithGoogle(payload)

            if (response.user.role == 'ADMIN') {
                router.push('/admin/dashboard');
            }
            else if (response.user.role == 'HOST') {
                router.push('/host/dashboard');
            }
            else if (response.user.role == 'USER') {
                router.push('/');
            }

            localStorage.setItem('access_token', response.access_token);
            fetchUser()

            toast.success('Đăng nhập thành công');

        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong!!!")
        }
    }

    return (
        <div
            onClick={handleGoogleClick}
            className="flex items-center justify-center w-full cursor-pointer group">
            <div
                className="flex items-center justify-center bg-white border border-gray-300 rounded-[10px] shadow-md hover:shadow-lg transform transition-transform hover:scale-105 group-hover:border-red-500">
                <div className="flex items-center justify-center p-3">
                    <FcGoogle className="text-3xl " />
                </div>
                <div className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-600 group-hover:text-red-500">
                    Login With Google
                </div>
            </div>
        </div>

    )
}

export default GoogleLogin
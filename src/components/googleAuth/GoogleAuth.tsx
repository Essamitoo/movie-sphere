'use client'
import { useAuthContext } from "@/contexts/authContext"
import { FcGoogle } from "react-icons/fc"

const GoogleAuth = () => {

  const {googleLogin} = useAuthContext()
  const handleGoogleAuth = () => {
    // Redirect to backend Google OAuth endpoint
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4321'}v1/auth/google/sign-up`;
  }
  return (
    <div className="-mt-4">
      <button
        onClick={handleGoogleAuth}
        className='w-full flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold text-secondary bg-white transition duration-200 ease-in-out hover:cursor-pointer hover:shadow-lg hover:shadow-white/50 '
      >
        <FcGoogle className='mr-2 w-4 h-4' />
        Iniciar con Google
      </button>
    </div>
  )
}

export default GoogleAuth

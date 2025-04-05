'use client'
import { AuthContext } from "@/contexts/authContext"
import { useRouter } from "next/navigation"
import { useContext } from "react"
import { FcGoogle } from "react-icons/fc"

const GoogleAuth = () => {

  const {googleLogin} = useContext(AuthContext)
  const router = useRouter()

  const handleGoogleAuth =  () => {
       
     googleLogin()
    router.push('/home')
  }
  return (
    <div className="-mt-4">
      <button
        onClick={handleGoogleAuth}
        className='w-full flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold text-secondary bg-white transition duration-200 ease-in-out hover:cursor-pointer hover:shadow-lg hover:shadow-white/50 '
      >
        <FcGoogle className='mr-2 w-4 h-4' />
        Registrarse con Google
      </button>
    </div>
  )
}

export default GoogleAuth

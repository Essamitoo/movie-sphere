'use client'
import { useAuthContext } from "@/contexts/authContext"
import AdminSettings from "./AdminSettings"
import UserSettings from "./UserSettings"

const Settings = () => {

  const { user } = useAuthContext()

  return (
   <div>
    {user?.role === "ADMIN" ? (<AdminSettings/>) : (<UserSettings/>) }
   </div>
  )
}

export default Settings
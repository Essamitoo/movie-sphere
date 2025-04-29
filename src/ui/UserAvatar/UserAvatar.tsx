import { useAuthContext } from "@/contexts/authContext"

const UserAvatar = () => {
  const {user} = useAuthContext()
  if(!user) return null
  return (
    <div>
      <img
								className={`
											w-12 h-12 
											rounded-full 
											border-2 
											${user.role === 'PREMIUM' ? 'border-amber-300' : 'border-transparent'}
										`}
								src={user.avatar}
								alt='avatar'
							/>
    </div>
  )
}

export default UserAvatar
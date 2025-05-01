import { useAuthContext } from '@/contexts/authContext'
import Link from 'next/link'

const UserAvatar = () => {
	const { user } = useAuthContext()
	if (!user) return null
	return (
		<Link href={user.role === 'ADMIN' ? '/dashboard/admin' : '/dashboard/user'}>
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
		</Link>
	)
}

export default UserAvatar



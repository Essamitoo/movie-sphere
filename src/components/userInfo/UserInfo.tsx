'use client'
import { useContext } from 'react'
import { AuthContext } from '@/contexts/authContext'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

const UserInfo = () => {
	const { user } = useContext(AuthContext)
	const { data: sessionGoogle } = useSession()

	if (!user) {
		return <div className='h-screen text-white px-4'>Loading...</div>
	}

	const { image, name, email } = user.user

	return (
		<div className='text-white px-4 mb-30'>
			<div className='flex flex-col mt-10 gap-4 text-center'>
				<div className='relative size-24 rounded-full overflow-hidden mx-auto'>
					<Image
						src={image}
						alt={name}
						style={{ objectFit: 'contain' }}
						fill
					/>
				</div>
				<div>
					<p className='font-semibold'>{name || sessionGoogle?.user?.name}</p>
					<p className='text-sm font-extralight'>{email}</p>
				</div>
			</div>
		</div>
	)
}

export default UserInfo

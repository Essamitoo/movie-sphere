'use client'
import { useContext } from 'react'
import { AuthContext } from '@/contexts/authContext'
import { useSession } from 'next-auth/react'
import UploadImageClient from '@/components/upload/UploadImageClient'

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
					<UploadImageClient image={image}/>
				<div>
					<p className='font-semibold'>{name || sessionGoogle?.user?.name}</p>
					<p className='text-sm font-extralight'>{email}</p>
				</div>
			</div>
		</div>
	)
}

export default UserInfo

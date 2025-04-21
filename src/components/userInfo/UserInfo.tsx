'use client'
import {  useAuthContext } from '@/contexts/authContext'
import UploadImageClient from '@/components/upload/UploadImageClient'

const UserInfo = () => {
	const { user } = useAuthContext()

	if (!user) {
		return <div className='h-screen text-white px-4'>Loading...</div>
	}

	const { avatar, name, email } = user

	return (
		<div className='text-white px-4 mb-30'>
			<div className='flex flex-col mt-10 gap-4 text-center'>
				<UploadImageClient image={avatar} />
				<div>
					<p className='font-semibold'>{name}</p>
					<p className='text-sm font-extralight'>{email}</p>
				</div>
			</div>
		</div>
	)
}

export default UserInfo

'use client'

import { useState, useContext } from 'react'
import { AuthContext } from '@/contexts/authContext'
import { Pencil } from 'lucide-react'
import Image from 'next/image'
import { updateUserAvatarService } from '@/services/authServices'
interface UploadImageClientProps {
	image?: string
}

export default function UploadImageClient({ image }: UploadImageClientProps) {
	const [imageUrl, setImageUrl] = useState(image)
	const { user, setUser } = useContext(AuthContext)
	const [deleteToken, setDeleteToken] = useState(user?.avatar_token || '')

	if (!user) return null

	async function updateAvatar(
		id: string,
		avatarUri: string,
		avatarToken: string
	): Promise<void> {
		try {
			const res = await fetch(
				process.env.NEXT_PUBLIC_API_URL + `v1/users/${id}`,
				{
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${user?.token}`,
					},
					body: JSON.stringify({
						avatar: avatarUri,
						avatar_token: avatarToken,
					}),
				}
			)

			const data = await res.json()

			if (user?.id && data) {
				const newAvatar = {
					...user,
					image: data.avatar,
					avatar_token: data.avatar_token,
				}

				setImageUrl(data.secure_url)
				setDeleteToken(data.delete_token)
				setUser(newAvatar)
				localStorage.setItem('user', JSON.stringify(newAvatar))
			}
		} catch (e) {
			console.log(e)
		}
	}

	async function handleUserImage(e: React.ChangeEvent<HTMLInputElement>) {
		e.preventDefault()
		const file = e.target.files?.[0]
		if (!file) return console.log('No se ha seleccionado un archivo')

		const payload = new FormData()
		payload.append('file', file)
		payload.append(
			'upload_preset',
			process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
		)

		// Cloudinary
		try {
			const res = await fetch(
				`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
				{
					method: 'POST',
					body: payload,
				}
			)

			const data = await res.json()
			if (!user) return console.log('Usuario no encontrado')
			updateAvatar(user?.id, data.secure_url, data.delete_token)
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<div className='relative mx-auto size-30'>
			<div className='relative w-full h-full rounded-full overflow-hidden'>
				<Image
					src={imageUrl || user?.image}
					alt='user'
					fill
					style={{ objectFit: 'cover' }}
				/>
			</div>

			<label
				htmlFor='file-upload'
				className='absolute -bottom-0 -right-0 bg-white p-2 rounded-full hover:cursor-pointer hover:scale-105 transition duration-200 ease-in-out'
			>
				<Pencil className='w-4 h-4 text-gray-700' />
			</label>

			<input
				id='file-upload'
				type='file'
				onChange={(e) => handleUserImage(e)}
				className='hidden'
				accept='image/*'
			/>
		</div>
	)
}

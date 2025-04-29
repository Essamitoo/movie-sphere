'use client'

import { useAuthContext } from '@/contexts/authContext'
import React, { useState } from 'react'
import ConfirmModal from '../ConfirmModal/ConfirmModal'

type FakeAdBannerProps = {
	imageUrl: string
}

const FakeAdBanner = ({ imageUrl }: FakeAdBannerProps) => {
	const { user } = useAuthContext()
  const [showModal, setShowModal] = useState(false)
	const isPremium = user?.role === 'PREMIUM' ? true : false

	if (isPremium) return null

  const handleQuit = () => {
    
  }

	return (
		<div className='w-full bg-gray-100 text-center py-4 my-4 '>
			<img
				src={imageUrl}
				alt='Fake Ad Banner'
				className='w-full h-auto rounded-md shadow-lg'
			/>
      <button onClick={() => setShowModal(true)} className='bg-quaternary px-2 rounded'>Quitar anuncio</button>

      {/* Modal de Confirmación */}
			<ConfirmModal
      link='/premium'
      confirmLabel='Mejorar a Premium'
				isOpen={showModal}
				message='Para quitar anuncios debes ser un usuario PREMIUM!'
				onConfirm={handleQuit}
				onCancel={() => setShowModal(false)} // Cerrar el modal al cancelar.
			/>
		</div>
	)
}

export default FakeAdBanner


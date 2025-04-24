'use client'

import { useState } from 'react'
import StarRating from '../starRating/StartRating'
import { toast } from 'react-toastify'
import { useAuthContext } from '@/contexts/authContext'
import { addReviewService, updateReviewService, deleteReviewService } from '@/services/reviewServices'

interface Props {
  img: string
  name: string
  movieId: number
  existingReview?: {
    id: number
    userId: number
    content: string
    rating: number
  }
}

const Comment: React.FC<Props> = ({ img, name, movieId, existingReview }) => {
  const { user } = useAuthContext()
  const [review, setReview] = useState(existingReview || null)
  const isOwner = review?.userId === user?.id

  const [comment, setComment] = useState(review?.content || '')
  const [rating, setRating] = useState(review?.rating || 4)
  const [editing, setEditing] = useState(!review)
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    if (!comment.trim()) {
      toast.warning('El comentario no puede estar vacío')
      return
    }

    try {
      setLoading(true)
      if (review) {
        const updated = await updateReviewService({ content: comment,rating }, Number(review.id), user!.token)
        setReview({ ...review, content: comment, rating })
        toast.success('Comentario actualizado ✅')
      } else {
        const created = await addReviewService({ userId: user!.id, movieId, content: comment, rating }, user!.token)
        setReview(created) 
        toast.success('Comentario enviado ✅')
      }
      setEditing(false)
    } catch (error) {
      console.error(error)
      toast.error('Error al guardar comentario ❌')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    try {
      setLoading(true)
      await deleteReviewService(review!.id, user!.token)
      setReview(null) // Eliminar el comentario
      setComment('') // Limpiar el comentario
      toast.success('Comentario eliminado 🗑️')
    } catch (error) {
      console.error(error)
      toast.error('Error al eliminar comentario ❌')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='w-full max-w-3xl rounded-xl border border-gray-800 bg-white/5 p-4 grid grid-cols-[80px_1fr] gap-4 shadow-lg'>
      {/* Usuario */}
      <div className='flex flex-col items-center'>
        <img src={img} alt={name} className='w-14 h-14 rounded-full object-cover' />
        <p className='text-sm mt-2 text-white text-center line-clamp-1'>{name}</p>
      </div>

      {/* Comentario */}
      <div className='flex flex-col gap-2 justify-between'>
        <StarRating rating={rating} onChange={editing ? setRating : undefined} />
        {editing ? (
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className='text-sm text-white p-3 rounded-md h-[140px] bg-gray-800/40 border border-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-quaternary resize-none'
            placeholder='Escribe aquí...'
          />
        ) : (
          <p className='text-white text-sm bg-gray-800/40 p-3 rounded-md border border-gray-700 min-h-[140px]'>
            {comment}
          </p>
        )}

        <div className='flex justify-end gap-2 mt-2'>
          {editing ? (
            <>
              <button
                onClick={handleSave}
                disabled={loading}
                className='bg-[#00a878] w-[100px] h-[36px] rounded-md text-white text-sm hover:scale-105 transition-transform disabled:opacity-50'
              >
                {loading ? 'Guardando...' : 'Guardar'}
              </button>
              {review && (
                <button
                  onClick={() => {
                    setEditing(false)
                    setComment(review.content)
                    setRating(review.rating)
                  }}
                  className='bg-gray-600 w-[100px] h-[36px] rounded-md text-white text-sm hover:scale-105 transition-transform'
                >
                  Cancelar
                </button>
              )}
            </>
          ) : (
            review ? (
              isOwner && (
                <>
                  <button
                    onClick={() => setEditing(true)}
                    className='bg-blue-600 w-[100px] h-[36px] rounded-md text-white text-sm hover:scale-105 transition-transform'
                  >
                    Editar
                  </button>
                  <button
                    onClick={handleDelete}
                    className='bg-red-600 w-[100px] h-[36px] rounded-md text-white text-sm hover:scale-105 transition-transform'
                  >
                    Eliminar
                  </button>
                </>
              )
            ) : (
              <button
                onClick={() => setEditing(true)}
                className='bg-[#00a878] w-[150px] h-[36px] mt-3 rounded-md font-medium text-sm text-white hover:scale-105 transition-transform'
              >
                Comentar
              </button>
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default Comment

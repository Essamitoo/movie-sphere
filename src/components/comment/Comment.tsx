import UserAvatar from "@/ui/UserAvatar/UserAvatar"
import StarRating from "../starRating/StartRating"
import { toast } from "react-toastify"
import { addReviewService, deleteReviewService, updateReviewService } from "@/services/reviewServices"
import { useAuthContext } from "@/contexts/authContext"
import { useEffect, useState } from "react"

const Comment: React.FC = ({ img, name, movieId }: any) => {
  const { user, setUser } = useAuthContext()
  const [reviews, setReviews] = useState<any[]>([])
  const [newComment, setNewComment] = useState('')
  const [newRating, setNewRating] = useState(4)
  const [loading, setLoading] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)

  useEffect(() => {
    if (user?.reviews) {
      const movieReviews = user.reviews.filter(
        (r: any) => r.movieId === movieId
      )
      setReviews(movieReviews)
    }
  }, [user, movieId])

  const handleAdd = async () => {
    if (!newComment.trim()) {
      toast.warning('El comentario no puede estar vacío')
      return
    }

    try {
      setLoading(true)
      const created = await addReviewService(
        {
          userId: user!.id,
          movieId,
          content: newComment,
          rating: newRating,
        },
        user!.token
      )

      setReviews((prev: any) => [...prev, created])
      setUser({
        ...user!,
        reviews: [...user!.reviews, created],
      })

      setNewComment('')
      setNewRating(4)
      toast.success('Comentario enviado ✅')
    } catch (error) {
      console.error(error)
      toast.error('Error al comentar ❌')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async (id: number, content: string, rating: number) => {
    try {
      setLoading(true)
      const updated = await updateReviewService(
        { content, rating },
        id,
        user!.token
      )

      const updatedList = reviews.map((r: any) =>
        r.id === id ? { ...r, content, rating } : r
      )
      setReviews(updatedList)
      setUser({
        ...user!,
        reviews: user!.reviews.map((r: any) =>
          r.id === id ? { ...r, content, rating } : r
        ),
      })

      setEditingId(null)
      toast.success('Comentario actualizado ✅')
    } catch (error) {
      console.error(error)
      toast.error('Error al actualizar ❌')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      setLoading(true)
      await deleteReviewService(id, user!.token)

      const updatedList = reviews.filter((r: any) => r.id !== id)
      setReviews(updatedList)
      setUser({
        ...user!,
        reviews: user!.reviews.filter((r: any) => r.id !== id),
      })

      toast.success('Comentario eliminado 🗑️')
    } catch (error) {
      console.error(error)
      toast.error('Error al eliminar ❌')
    } finally {
      setLoading(false)
    }
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>, id: number) => {
    const updatedReviews = reviews.map((rev: any) =>
      rev.id === id ? { ...rev, content: e.target.value } : rev
    )
    setReviews(updatedReviews)
  }

  return (
    <div className='w-full max-w-3xl flex flex-col gap-6'>
      {/* Comentarios existentes */}
      {reviews.map((r: any) => (
        <div
          key={r.id}
          className='w-full rounded-xl border border-gray-800 bg-white/5 p-4 grid grid-cols-[80px_1fr] gap-4 shadow-lg'
        >
          <div className='flex flex-col items-center'>
            <UserAvatar />
            <p className='text-sm mt-2 text-white text-center line-clamp-1'>
              {name}
            </p>
          </div>

          <div className='flex flex-col gap-2'>
            <StarRating
              rating={r.rating}
              onChange={
                editingId === r.id ? (newVal) => {
                  const updated = reviews.map((rev: any) =>
                    rev.id === r.id ? { ...rev, rating: newVal } : rev
                  )
                  setReviews(updated)
                } : undefined
              }
            />
            {editingId === r.id ? (
              <textarea
                value={r.content}
                onChange={(e) => handleContentChange(e, r.id)}
                className='text-sm text-white p-3 rounded-md h-[140px] bg-gray-800/40 border border-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-quaternary resize-none'
              />
            ) : (
              <p className='text-white text-sm bg-gray-800/40 p-3 rounded-md border border-gray-700 min-h-[140px]'>
                {r.content}
              </p>
            )}

            <div className='flex justify-end gap-2'>
              {editingId === r.id ? (
                <>
                  <button
                    onClick={() => handleUpdate(r.id, r.content, r.rating)}
                    disabled={loading}
                    className='bg-[#00a878] w-[100px] h-[36px] rounded-md text-white text-sm hover:scale-105 transition-transform disabled:opacity-50'
                  >
                    {loading ? 'Guardando...' : 'Guardar'}
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className='bg-gray-600 w-[100px] h-[36px] rounded-md text-white text-sm hover:scale-105 transition-transform'
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setEditingId(r.id)}
                    className='bg-blue-600 w-[100px] h-[36px] rounded-md text-white text-sm hover:scale-105 transition-transform'
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(r.id)}
                    className='bg-red-600 w-[100px] h-[36px] rounded-md text-white text-sm hover:scale-105 transition-transform'
                  >
                    Eliminar
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Nuevo comentario */}
      <div className='w-full rounded-xl border border-gray-800 bg-white/5 p-4 grid grid-cols-[80px_1fr] gap-4 shadow-lg'>
        <div className='flex flex-col items-center'>
          <UserAvatar />
          <p className='text-sm mt-2 text-white text-center line-clamp-1'>
            {name}
          </p>
        </div>
        <div className='flex flex-col gap-2'>
          <StarRating rating={newRating} onChange={setNewRating} />
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className='text-sm text-white p-3 rounded-md h-[140px] bg-gray-800/40 border border-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-quaternary resize-none'
            placeholder='Escribe un nuevo comentario...'
          />
          <div className='flex justify-end'>
            <button
              onClick={handleAdd}
              disabled={loading}
              className='bg-[#00a878] w-[150px] h-[36px] rounded-md font-medium text-sm text-white hover:scale-105 transition-transform disabled:opacity-50'
            >
              {loading ? 'Enviando...' : 'Comentar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Comment

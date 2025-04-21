'use client'

import { useState } from 'react'
import { useAuthContext } from '@/contexts/authContext'
import { toast } from 'react-toastify'
import { deleteActorService, getActorsService, updateActorService } from '@/services/actorServices'

const SearchActor = () => {
  const { user } = useAuthContext()
  const [search, setSearch] = useState('')
  const [filteredActors, setFilteredActors] = useState<any[]>([])
  const [editingActorId, setEditingActorId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState({ name: '', birthdate: '', avatar: '' })

  const handleSearch = async () => {
    try {
      const allActors = await getActorsService()
      const results = allActors.filter((actor: any) =>
        actor.name.toLowerCase().includes(search.toLowerCase())
      )
      setFilteredActors(results)
    } catch (error) {
      toast.error('Error al buscar actores')
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteActorService(id, user!.token)
      setFilteredActors(prev => prev.filter(actor => actor.id !== id))
      toast.success('Actor eliminado')
    } catch (error) {
      toast.error('Error al eliminar el actor')
    }
  }

  const handleEditToggle = (actor: any) => {
    if (editingActorId === actor.id) {
      setEditingActorId(null)
    } else {
      setEditingActorId(actor.id)
      setEditForm({
        name: actor.name,
        birthdate: actor.birthdate.split('T')[0],
        avatar: actor.avatar
      })
    }
  }

  const handleEditSubmit = async (e: React.FormEvent, id: number) => {
    e.preventDefault()
  
    const toISOStringDate = (date: string) => {
      return new Date(date).toISOString()
    }
  
    try {
      await updateActorService(id, {
        ...editForm,
        birthdate: toISOStringDate(editForm.birthdate)
      }, user!.token)
  
      setFilteredActors(prev =>
        prev.map(actor => (actor.id === id ? { ...actor, ...editForm } : actor))
      )
      toast.success('Actor actualizado')
      setEditingActorId(null)
    } catch (error) {
      toast.error('Error al editar el actor')
    }
  }
  

  return (
    <div className='bg-[#202020] p-6 rounded-xl shadow-md text-[#d0d0d0]'>
      <h3 className='text-xl font-bold text-[#ffffff] mb-4'>Buscar Actor</h3>

      <div className='flex gap-2 mb-6'>
        <input
          type='text'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='w-full p-2 rounded bg-[#ffffff] text-[#202020] outline-none'
          placeholder='Nombre del actor...'
        />
        <button
          onClick={handleSearch}
          className='bg-[#00a878] text-[#ffffff] px-4 py-2 rounded hover:bg-[#00cc92]'
        >
          Buscar
        </button>
      </div>

      <ul className='space-y-4'>
        {filteredActors.map(actor => (
          <li key={actor.id} className='border-b border-[#d0d0d0] pb-3'>
            <div className='flex justify-between items-center'>
              <div>
                <p className='text-lg font-semibold'>{actor.name}</p>
                <p className='text-sm text-[#a0a0a0]'>{new Date(actor.birthdate).toLocaleDateString()}</p>
              </div>
              <div className='flex gap-2'>
                <button
                  onClick={() => handleEditToggle(actor)}
                  className='bg-quaternary text-white px-3 py-1 rounded hover:bg-quaternary/80'
                >
                  {editingActorId === actor.id ? 'Cancelar' : 'Editar'}
                </button>
                <button
                  onClick={() => handleDelete(actor.id)}
                  className='bg-red-900 text-white px-3 py-1 rounded hover:bg-red-800'
                >
                  Eliminar
                </button>
              </div>
            </div>

            {editingActorId === actor.id && (
              <form onSubmit={(e) => handleEditSubmit(e, actor.id)} className='mt-4 space-y-3'>
                <input
                  type='text'
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className='w-full p-2 rounded bg-[#ffffff] text-[#202020]'
                />
                <input
                  type='date'
                  value={editForm.birthdate}
                  onChange={(e) => setEditForm({ ...editForm, birthdate: e.target.value })}
                  className='w-full p-2 rounded bg-[#ffffff] text-[#202020]'
                />
                <input
                  type='url'
                  value={editForm.avatar}
                  onChange={(e) => setEditForm({ ...editForm, avatar: e.target.value })}
                  className='w-full p-2 rounded bg-[#ffffff] text-[#202020]'
                />
                <button
                  type='submit'
                  className='w-full bg-[#00a878] text-white py-2 rounded hover:bg-[#00cc92]'
                >
                  Guardar cambios
                </button>
              </form>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SearchActor


'use client'

import { useEffect, useState } from 'react'
import { useAuthContext } from '@/contexts/authContext'
import { toast } from 'react-toastify'
import { getActorsService, updateActorService } from '@/services/actorServices'

const EditActor = () => {
  const [actors, setActors] = useState<any[]>([])
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [formData, setFormData] = useState({ name: '', birthdate: '', avatar: '' })

  const { user } = useAuthContext()

  useEffect(() => {
    const fetchActors = async () => {
      const res = await getActorsService()
      setActors(res)
    }
    fetchActors()
  }, [])

  const handleSelect = (id: number) => {
    const actor = actors.find(a => a.id === id)
    if (actor) {
      setSelectedId(id)
      setFormData({
        name: actor.name,
        birthdate: actor.birthdate.split('T')[0],
        avatar: actor.avatar
      })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedId) return

    try {
      const updatedData = {
        ...formData,
        birthdate: new Date(formData.birthdate).toISOString().split('T')[0] + 'T00:00:00.000Z'
      }

      await updateActorService(selectedId, updatedData, user!.token)
      toast.success('Actor actualizado')
    } catch (error) {
      toast.error('Error al actualizar actor')
    }
  }

  return (
    <div className='bg-[#202020] p-4 rounded-xl text-[#d0d0d0]'>
      <h3 className='text-[#ffffff] font-semibold mb-4'>Editar Actor</h3>

      <select
        className='w-full p-2 rounded bg-[#ffffff] text-[#202020] mb-4'
        onChange={(e) => handleSelect(Number(e.target.value))}
        defaultValue=''
      >
        <option value='' disabled>Selecciona un actor</option>
        {actors.map(actor => (
          <option key={actor.id} value={actor.id}>{actor.name}</option>
        ))}
      </select>

      {selectedId && (
        <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
          <input
            name='name'
            value={formData.name}
            onChange={handleChange}
            className='p-2 rounded bg-[#ffffff] text-[#202020]'
            placeholder='Nombre'
          />
          <input
            name='birthdate'
            type='date'
            value={formData.birthdate}
            onChange={handleChange}
            className='p-2 rounded bg-[#ffffff] text-[#202020]'
          />
          <input
            name='avatar'
            value={formData.avatar}
            onChange={handleChange}
            className='p-2 rounded bg-[#ffffff] text-[#202020]'
            placeholder='URL del avatar'
          />

          <button
            type='submit'
            className='font-semibold py-2 rounded bg-[#00a878] text-[#ffffff] hover:bg-[#00cc92]'
          >
            Guardar Cambios
          </button>
        </form>
      )}
    </div>
  )
}

export default EditActor

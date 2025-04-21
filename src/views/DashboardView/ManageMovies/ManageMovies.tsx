'use client'

import { useAuthContext } from '@/contexts/authContext'
import { addMovie } from '@/services/movieServices'
import { ChangeEvent, FormEvent, useState } from 'react'
import SearchMovieCard from './SearchMovie'

const ManageMovies = () => {

    const {user} = useAuthContext()
    const {token } = user!

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    year: '',
    poster: '',
    splashart: '',
    duration: '',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log('Peli creada:', formData)
    const res = addMovie(formData, token!)
    // Aquí puedes enviar los datos a tu API o guardarlos en tu DB
    // Ejemplo: await fetch('/api/movies', { method: 'POST', body: JSON.stringify(formData) })

    // Reset form
    // setFormData({
    //   title: '',
    //   description: '',
    //   year: '',
    //   poster: '',
    //   splashart: '',
    //   duration: '',
    // })
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-secondary text-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Crear nueva película</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
       
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={formData.title}
          onChange={handleChange}
          className="p-2 rounded bg-gray-800"
          required
        />
        <textarea
          name="description"
          placeholder="Descripción"
          value={formData.description}
          onChange={handleChange}
          className="p-2 rounded bg-gray-800"
          required
        />
        <input
          type="text"
          name="year"
          placeholder="Año"
          value={formData.year}
          onChange={handleChange}
          className="p-2 rounded bg-gray-800"
          required
        />
        <input
          type="url"
          name="poster"
          placeholder="URL del póster"
          value={formData.poster}
          onChange={handleChange}
          className="p-2 rounded bg-gray-800"
          required
        />
        <input
          type="url"
          name="splashart"
          placeholder="URL del splashart"
          value={formData.splashart}
          onChange={handleChange}
          className="p-2 rounded bg-gray-800"
          required
        />
        <input
          type="text"
          name="duration"
          placeholder="Duración (ej: 169 min)"
          value={formData.duration}
          onChange={handleChange}
          className="p-2 rounded bg-gray-800"
          required
        />
        <button
          type="submit"
          className="bg-tertiary hover:bg-tertiary/90 text-black font-bold py-2 px-4 rounded"
        >
          Crear Película
        </button>
      </form>
      <SearchMovieCard/>
      
    </div>
  )
}

export default ManageMovies

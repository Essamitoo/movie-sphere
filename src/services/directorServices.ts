import { IFormData } from '@/interfaces/IForm'
import { Director } from '@/interfaces/IMedia'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

export const getDirectorsService = async () => {
	try {
		const response = await fetch(`${apiUrl}v1/directors`)

		if (!response.ok) {
			throw new Error('Error al obtener directores')
		}

		const data = await response.json()
		return data
	} catch (error) {
		console.log(error)
		throw error
	}
}

// Crear un director con FormData

export const createDirectorService = async (
	directorData: IFormData,
	token: string
  ) => {
	try {
	  console.log(directorData)
  
	  const response = await fetch(`${apiUrl}v1/directors`, {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json', 
		  Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(directorData),
	  })
  
	  if (!response.ok) {
		const errorText = await response.text()
		console.error('Respuesta del servidor:', errorText)
		throw new Error('Error al crear el director')
	  }
  
	  const data = await response.json()
	  return data
	} catch (error) {
	  console.log('Error al crear director:', error)
	  throw error
	}
  }
  
// Actualizar un director con FormData

  export const updateDirectorService = async (
	id: number,
	director: Partial<Director>,  // Usamos Partial de una interfaz específica
	token: string
  ) => {
	try {
		console.log(director);
		
	  const response = await fetch(`${apiUrl}v1/directors/${id}`, {
		method: 'PATCH',
		headers: {
		  'Content-Type': 'application/json',
		  Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(director),
	  })
  
	  if (!response.ok) {
		console.log('Error status:', response.status)
		const errorData = await response.text()
		console.log('Error body:', errorData)
		throw new Error('Error al actualizar el director')
	  }
  
	  return await response.json()
  
	} catch (error: any) {
	  console.error('Error en updateDirectorService:', error.message)
	  throw new Error(error.message || 'Error al actualizar el director')
	}
  }
  
  

export const deleteDirectorService = async (id: number, token: string) => {
	try {
		const response = await fetch(`${apiUrl}v1/directors/${id}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})

		if (!response.ok) {
			throw new Error('Error al eliminar el director')
		}

		return { message: 'Director eliminado' }
	} catch (error) {
		console.log(error)
		throw error
	}
}

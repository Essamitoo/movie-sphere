const apiUrl = process.env.NEXT_PUBLIC_API_URL

export const createGenreService = async (genre: string, token: string) => {
    try {
        const response = await fetch(`${apiUrl}v1/genres`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({title: genre}),
        })

        if (!response.ok) {
            throw new Error('Server error')
        }

        const data = await response.json()
        return data

    } catch (error) {
        console.log(error)
        throw error
    }
}

export const getGenresService = async () => {
	try {
		const response = await fetch(`${apiUrl}v1/genres`)

		if (!response.ok) {
			throw new Error('Error al obtener los géneros')
		}

		const data = await response.json()
		return data
	} catch (error) {
		console.error(error)
		throw error
	}
}

export const updateGenreService = async (
	id: number,
	newName: string,
	token: string
) => {
	try {
        console.log(newName);
        
		const response = await fetch(`${apiUrl}v1/genres/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ title: newName }),
		})

		if (!response.ok) {
            const errorData = await response.json();
		    console.error('Error detalle:', errorData);
			throw new Error('Error al actualizar el género')
		}

		const data = await response.json()
		return data
	} catch (error) {
		console.error(error)
		throw error
	}
}

export const deleteGenreService = async (id: number, token: string) => {
	try {
		const response = await fetch(`${apiUrl}v1/genres/${id}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})

		if (!response.ok) {
			throw new Error('Error al eliminar el género')
		}

		return true

	} catch (error) {
		console.error(error)
		throw error
	}
}

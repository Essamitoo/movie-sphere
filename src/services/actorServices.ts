import { IFormData } from '@/interfaces/IForm'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

export const createActorService = async (
	actorData: IFormData,
	token: string
) => {
	try {
		const response = await fetch(`${apiUrl}v1/actors`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(actorData),
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

export const getActorsService = async () => {
	try {
		const response = await fetch(`${apiUrl}v1/actors`)
		if (!response.ok) throw new Error('Server error')
		const data = await response.json()
		return data
	} catch (error) {
		console.log(error)
		throw error
	}
}

export const updateActorService = async (
	id: number,
	actorData: IFormData,
	token: string
) => {
	try {
		const response = await fetch(`${apiUrl}v1/actors/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(actorData),
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

export const deleteActorService = async (id: number, token: string) => {
	try {
		const response = await fetch(`${apiUrl}v1/actors/${id}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})

		if (!response.ok) {
			throw new Error('Server error')
		}

	} catch (error) {
		console.log(error)
		throw error
	}
}

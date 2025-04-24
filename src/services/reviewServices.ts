import { IFormData } from '@/interfaces/IForm'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

export const addReviewService = async (reviewData: IFormData, token: string) => {
	try {
		console.log('reviewData', reviewData)
		const response = await fetch(`${apiUrl}v1/reviews`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(reviewData),
		})

		if (!response.ok) throw new Error('Failed to add review')

		const data = await response.json()
        console.log(data);
        
		return data
	} catch (error) {
		console.log(error)
		throw error
	}
}

export const getReviewService = async (id: number, token: string) => {
	try {
		const response = await fetch(`${apiUrl}v1/reviews/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})

		if (!response.ok) throw new Error('Failed to get review')

		const data = await response.json()
		return data
	} catch (error) {
		console.log(error)
		throw error
	}
}

export const updateReviewService = async (review: IFormData, id: number, token: string) => {
    try {
        console.log('reviewData', review)
        const response = await fetch(`${apiUrl}v1/reviews/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(review),
        })

        if (!response.ok) throw new Error('Failed to update review')

        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const deleteReviewService = async (id: number, token: string) => {
	try {
		const response = await fetch(`${apiUrl}v1/reviews/${id}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})

		if (!response.ok) throw new Error('Failed to delete review')

	} catch (error) {
		console.log(error)
		throw error
	}
}
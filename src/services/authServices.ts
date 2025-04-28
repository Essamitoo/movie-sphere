import { IFormData } from '@/interfaces/IForm'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

export const loginService = async (loginData: IFormData) => {
	try {
		const response = await fetch(`${apiUrl}v1/auth/sign-in`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(loginData),
		})

		const data = await response.json()

		return data
	} catch (error) {
		console.log(error)
	}
}

export const registerService = async (registerData: IFormData) => {
	try {
		const response = await fetch(`${apiUrl}v1/auth/sign-up`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(registerData),
		})

		const data = await response.json()
		return data
	} catch (error) {
		console.log(error)
	}
}

export const updateUserService = async (
	updateUserData: IFormData,
	token: string,
	id: number
) => {
	try {
		const response = await fetch(`${apiUrl}v1/users/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(updateUserData),
		})

		const data = await response.json()

		if (!response.ok) throw new Error(data.message || 'Error en la actualización')
		

		return data
	} catch (error) {
		console.error('Error en updateUserService:', error)
		throw error
	}
}

export const deleteUserService = async (token: string, id: number) => {
	try {
		const response = await fetch(`${apiUrl}v1/users/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})

		if (!response.ok) throw new Error(`Error al eliminar el usuario: ${response.statusText}`)
		
	} catch (error) {
		console.log(error)
		throw error
	}
}

export const getUserByIdService = async (id: number, token: string) => {
	try {
		const response = await fetch(`${apiUrl}v1/users/${id}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})

		if (!response.ok) throw new Error('Usuario no encontrado')


		const data = await response.json()
		return data
	} catch (error) {
		console.error('Error en getUserByIdService:', error)
		throw error
	}
}

//Actualiza el avatar del usuario con la URL de la imagen y el token de eliminación de Cloudinary

export const updateUserAvatarService = async (
	userId: string,
	avatarUrl: string,
	avatarToken: string
) => {
	try {
		const response = await fetch(`${apiUrl}v1/users/${userId}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				avatar: avatarUrl,
				avatar_token: avatarToken,
			}),
		})

		const data = await response.json()
		return data
	} catch (error) {
		console.log(error)
	}
}
export async function createCheckoutSession(userId: string): Promise<string> {
	try {
	  const response = await fetch(`${apiUrl}v1/stripe/checkout-session`, {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify({ userId }),
	  });
  
	  if (!response.ok) {
		throw new Error(`Error: ${response.statusText}`);
	  }
  
	  const data: { url: string } = await response.json();
	  return data.url; // Devuelve la URL del pago
	} catch (error) {
	  console.error('Error creando sesión de pago:', error);
	  throw error;
	}
  }
  interface ConfirmPaymentRequest {
	sessionId: string;
	userId: string;
  }
  
  export async function confirmPayment(requestData: ConfirmPaymentRequest): Promise<void> {
	try {
	  const response = await fetch(`${apiUrl}v1/stripe/confirm-payment`, {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify(requestData),
	  });
  
	  if (!response.ok) {
		throw new Error(`Error: ${response.statusText}`);
	  }
  
	  console.log('Pago confirmado con éxito.');
	} catch (error) {
	  console.error('Error al confirmar el pago:', error);
	  throw error;
	}
  }
  
  
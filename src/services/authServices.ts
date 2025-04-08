import { IFormData } from '@/interfaces/IForm'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

export const loginService = async (loginData: IFormData) => {
	try {
		const response = await fetch(`${apiUrl}/v1/auth/sign-in`, {
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
		const response = await fetch(`${apiUrl}/v1/auth/sign-up`, {
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

//Actualiza el avatar del usuario con la URL de la imagen y el token de eliminación de Cloudinary

export const updateUserAvatarService = async (
	userId: string,
	imageUrl: string,
	deleteToken: string,
	access_token: string,
  ) => {
	try {
	  const response = await fetch(`${apiUrl}/v1/users/${userId}`, {
		method: 'PATCH', 
		headers: {
		  'Content-Type': 'application/json',
		  'Authorization': `Bearer ${access_token}`
		},
		body: JSON.stringify({
		  avatar: imageUrl,
		  avatar_token: deleteToken,
		}),
	  });
  
  

	  const data = await response.json();
	  console.log(data);
	  
	  return data;
	} catch (error) {
	  console.error(error);
	}
  };
  
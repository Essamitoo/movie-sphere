import { IFormData } from "@/interfaces/IForm";
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030';


export const loginService = async (loginData: IFormData) => {
  const response = await fetch(`${apiUrl}/api/v1/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const data = await response.json();
  return data;

};

export const registerService = async (registerData: IFormData) => {
	const response = await fetch(`${apiUrl}/api/v1/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(registerData),
	})

	if (!response.ok) {
		throw new Error('Register failed')
	}

	const data = await response.json()
	return data
}
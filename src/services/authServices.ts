import { IFormData } from "@/interfaces/IForm";
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030';


export const loginService = async (loginData: IFormData) => {
    try {
        const response = await fetch(`${apiUrl}/api/v1/auth/login`, {
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

};

export const registerService = async (registerData: IFormData) => {
    try {
        const response = await fetch(`${apiUrl}/api/v1/auth/register`, {
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
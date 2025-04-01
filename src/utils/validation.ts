export const isValid = (
	validation: string,
	value: string,
	data?: { password?: string }
) => {
	switch (validation) {
		case 'email':
			return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

		case 'password':
			return /^.{6,}$/.test(value) // Mínimo 6 caracteres

		case 'name':
			return /^[a-zA-Z\s]+$/.test(value) && value.length > 2 // Solo letras y espacios, mínimo 3 caracteres

		case 'repeatPassword':
			return value === data?.password // Solo debe coincidir con password

		default:
			return false
	}
}

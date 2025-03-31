export const isValid = (validation: string, value: string, data?: { password?: string }) => {
  switch (validation) {
     case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

     case 'password':
        return /^(?=.*[A-Z])(?=.*\d).{6,}$/.test(value); // Mínimo 6 caracteres, 1 mayúscula, 1 número

     case 'name':
        return /^[a-zA-Z\s]+$/.test(value) && value.length > 2; // Solo letras y espacios, mínimo 3 caracteres

     case 'repeatPassword':
        return value.length > 5 && value === data?.password; // Mínimo 6 caracteres y debe coincidir con `password`

     default:
        return false;
  }
};

export const isValid = (validation: string, value: string) => {
  if (validation === 'email') {
     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  if (validation === 'password') {
     return value.length > 5;
  }

  if (validation === 'name') {
     return value.length > 2;
  }

  if (validation === 'repeatPassword') {
     return value.length > 5;
  }
};

export const validation = {
  // Simple regex for email validation
  isEmailValid: (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Password must be at least 8 characters
  isPasswordValid: (password: string) => {
    return password.length >= 8;
  },

  // Name must be at least 2 characters
  isNameValid: (name: string) => {
    return name.trim().length >= 2;
  }
};
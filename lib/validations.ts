// Brazilian CPF Validation
// Validates Brazilian CPF (Cadastro de Pessoas Físicas) format
export function validateCPF(cpf: string): boolean {
  // Remove non-numeric characters
  const cleanCPF = cpf.replace(/\D/g, '');

  // Check if CPF has exactly 11 digits
  if (cleanCPF.length !== 11) {
    return false;
  }

  // Check if all digits are the same (invalid CPF)
  if (/^(\d)\1{10}$/.test(cleanCPF)) {
    return false;
  }

  // Calculate first verification digit
  let sum = 0;
  let remainder = 0;
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cleanCPF.substring(i - 1, i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }
  if (remainder !== parseInt(cleanCPF.substring(9, 10))) {
    return false;
  }

  // Calculate second verification digit
  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cleanCPF.substring(i - 1, i)) * (12 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }
  if (remainder !== parseInt(cleanCPF.substring(10, 11))) {
    return false;
  }

  return true;
}

// Email Validation
// Validates email format according to RFC 5322 (simplified)
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

// Phone Number Validation
// Validates Brazilian phone numbers (with or without country code)
export function validatePhoneNumber(phone: string): boolean {
  // Remove non-numeric characters
  const cleanPhone = phone.replace(/\D/g, '');

  // Brazilian phone formats:
  // - 10 digits: (XX) XXXX-XXXX
  // - 11 digits: (XX) XXXXX-XXXX
  // - 12 digits with country code: 55 (XX) XXXXX-XXXX
  // - 13 digits with country code: 55 (XX) XXXXX-XXXX

  if (cleanPhone.length === 10 || cleanPhone.length === 11) {
    // Valid Brazilian phone format
    return /^[1-9][0-9]{8,10}$/.test(cleanPhone);
  }

  if (cleanPhone.length === 12 || cleanPhone.length === 13) {
    // Valid with country code 55
    if (cleanPhone.startsWith('55')) {
      const phoneWithoutCountryCode = cleanPhone.substring(2);
      return /^[1-9][0-9]{8,10}$/.test(phoneWithoutCountryCode);
    }
  }

  return false;
}

// Name Validation
// Validates user names (minimum 3 characters, no numbers)
export function validateName(name: string): boolean {
  const nameRegex = /^[a-zA-ZÀ-ÿ\s]{3,100}$/;
  return nameRegex.test(name.trim());
}

// Password Validation
// Validates password strength
export function validatePassword(password: string): boolean {
  // Minimum 8 characters
  if (password.length < 8) {
    return false;
  }

  // Maximum 128 characters
  if (password.length > 128) {
    return false;
  }

  return true;
}

// Export validation result type
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

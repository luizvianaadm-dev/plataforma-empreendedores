// Funções de validação para CPF e CNPJ

export function validarCPF(cpf: string): boolean {
  // Remove caracteres não numéricos
  const cpfLimpo = cpf.replace(/[^\d]/g, '')
  
  // Verifica se tem 11 dígitos
  if (cpfLimpo.length !== 11) return false
  
  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(cpfLimpo)) return false
  
  // Valida primeiro dígito verificador
  let soma = 0
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpfLimpo.charAt(i)) * (10 - i)
  }
  let resto = 11 - (soma % 11)
  let digito1 = resto >= 10 ? 0 : resto
  
  if (digito1 !== parseInt(cpfLimpo.charAt(9))) return false
  
  // Valida segundo dígito verificador
  soma = 0
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpfLimpo.charAt(i)) * (11 - i)
  }
  resto = 11 - (soma % 11)
  let digito2 = resto >= 10 ? 0 : resto
  
  return digito2 === parseInt(cpfLimpo.charAt(10))
}

export function validarCNPJ(cnpj: string): boolean {
  // Remove caracteres não numéricos
  const cnpjLimpo = cnpj.replace(/[^\d]/g, '')
  
  // Verifica se tem 14 dígitos
  if (cnpjLimpo.length !== 14) return false
  
  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{13}$/.test(cnpjLimpo)) return false
  
  // Valida primeiro dígito verificador
  let tamanho = cnpjLimpo.length - 2
  let numeros = cnpjLimpo.substring(0, tamanho)
  const digitos = cnpjLimpo.substring(tamanho)
  let soma = 0
  let pos = tamanho - 7
  
  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--
    if (pos < 2) pos = 9
  }
  
  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)
  if (resultado !== parseInt(digitos.charAt(0))) return false
  
  // Valida segundo dígito verificador
  tamanho = tamanho + 1
  numeros = cnpjLimpo.substring(0, tamanho)
  soma = 0
  pos = tamanho - 7
  
  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--
    if (pos < 2) pos = 9
  }
  
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)
  return resultado === parseInt(digitos.charAt(1))
}

export function formatarCPF(cpf: string): string {
  const cpfLimpo = cpf.replace(/[^\d]/g, '')
  return cpfLimpo.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

export function formatarCNPJ(cnpj: string): string {
  const cnpjLimpo = cnpj.replace(/[^\d]/g, '')
  return cnpjLimpo.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
}

export function formatarCEP(cep: string): string {
  const cepLimpo = cep.replace(/[^\d]/g, '')
  return cepLimpo.replace(/(\d{5})(\d{3})/, '$1-$2')
}

export function formatarTelefone(telefone: string): string {
  const tel = telefone.replace(/[^\d]/g, '')
  if (tel.length === 11) {
    return tel.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  }
  return tel.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
}

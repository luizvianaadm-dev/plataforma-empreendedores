# Validation API Layer

## Overview

This directory contains the government data validation API endpoints for the Plataforma Empreendedores. All validators are built with free Brazilian government APIs and are LGPD-compliant.

## Endpoints

### 1. CPF Validator
**File:** `cpf-validator.ts`
**Endpoint:** `POST /api/validation/cpf-validator`

Validates Brazilian CPF (Personal ID) numbers using local check digit algorithm.

**Request:**
```json
{
  "cpf": "123.456.789-10"
}
```

**Response (Valid):**
```json
{
  "valid": true,
  "cpf": "12345678910",
  "formatted": "123.456.789-10",
  "message": "CPF válido"
}
```

### 2. CEP Validator
**File:** `cep-validator.ts`
**Endpoint:** `POST /api/validation/cep-validator`

Validates Brazilian ZIP codes (CEP) and returns complete address information via ViaCEP API.

**Request:**
```json
{
  "cep": "01310-100"
}
```

**Response (Valid):**
```json
{
  "valid": true,
  "cep": "01310100",
  "formatted": "01310-100",
  "address": {
    "street": "Avenida Paulista",
    "neighborhood": "Bela Vista",
    "city": "São Paulo",
    "state": "SP",
    "ddd": "11"
  },
  "ibge": "3550308"
}
```

### 3. CNPJ Validator
**File:** `cnpj-validator.ts`
**Endpoint:** `POST /api/validation/cnpj-validator`

Validates Brazilian CNPJ (Company ID) numbers with optional company data from Receita Federal.

**Request:**
```json
{
  "cnpj": "11.222.333/0001-81"
}
```

**Response (Valid):**
```json
{
  "valid": true,
  "cnpj": "11222333000181",
  "formatted": "11.222.333/0001-81",
  "company": {
    "name": "Company Name LTDA",
    "status": "Ativa",
    "address": "Address details",
    "main_activity": "Economic activity"
  },
  "api_available": true
}
```

## Utility Functions

**File:** `validation-utils.ts`

Shared utilities for all validators:

- `cleanNumber()`: Remove non-digit characters
- `formatErrorResponse()`: Standard error response format
- `logValidationAttempt()`: LGPD-compliant audit logging
- `getCachedValidation()` / `setCachedValidation()`: Result caching with TTL
- `isValidEmail()`: Email format validation
- `isValidBrazilianPhone()`: Brazilian phone validation
- `formatSuccessResponse()`: Standard success response format
- `getClientIp()`: Extract client IP from request
- `checkRateLimit()`: Rate limiting per identifier
- `getRateLimitStatus()`: Get remaining request quota

## Rate Limiting

Each endpoint implements rate limiting:
- **Default:** 100 requests per 15 minutes per IP address
- **Rate limit headers:** Included in all responses
- **Fallback:** Graceful degradation if rate limit exceeded

## Caching Strategy

- **CPF results:** 24 hours (rarely changes)
- **CNPJ data:** 1 hour (quarterly updates from government)
- **CEP data:** 7 days (stable address data)
- **Cache key:** Hash of input + validation type

## LGPD Compliance

- All validation attempts logged to `audit_trail` table
- Client IP captured for security monitoring
- User ID tracked when available
- Timestamps stored in ISO 8601 format
- No sensitive data cached without user consent

## Error Handling

- Invalid format: HTTP 400
- Not found: HTTP 200 with `valid: false`
- API unavailable: Fallback to local validation (CPF/CNPJ)
- Server error: HTTP 500 with error details
- Rate limited: HTTP 429 with retry-after header

## Testing

### Test CPF Numbers
- Valid: 11144477735 (digit check: valid)
- Invalid: 11111111111 (all same digits)

### Test CEP Numbers
- Valid: 01310100 (Avenida Paulista, SP)

### Test CNPJ Numbers
- Will use real data from Receita Federal

## Next Steps

1. Integrate validators into EditProfileModal
2. Integrate validators into CompanyDataModal
3. Add real-time validation feedback
4. Implement quarterly sync job for CNPJ data
5. Create admin dashboard for validation monitoring

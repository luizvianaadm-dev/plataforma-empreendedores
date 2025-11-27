// Shared validation utilities for government data validation APIs

/**
 * Removes all non-digit characters from a string
 */
export function cleanNumber(value: string): string {
  return value.replace(/\D/g, '');
}

/**
 * Format error response for API responses
 */
export function formatErrorResponse(message: string, details?: string) {
  return {
    valid: false,
    error: message,
    details,
    timestamp: new Date().toISOString()
  };
}

/**
 * Log validation attempt for LGPD compliance
 */
export async function logValidationAttempt(
  userId: string | undefined,
  validationType: 'CPF' | 'CNPJ' | 'CEP',
  document: string,
  result: boolean,
  ipAddress: string
) {
  // This would integrate with Supabase audit_trail table
  // For now, returning the data structure
  return {
    user_id: userId,
    validation_type: validationType,
    document: cleanNumber(document), // Store cleaned version
    result,
    ip_address: ipAddress,
    timestamp: new Date().toISOString(),
    user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : 'API'
  };
}

/**
 * Cache validation result for a period
 */
const validationCache = new Map<string, { result: any; expiry: number }>();

export function getCachedValidation(key: string): any | null {
  const cached = validationCache.get(key);
  if (!cached) return null;
  
  if (Date.now() > cached.expiry) {
    validationCache.delete(key);
    return null;
  }
  
  return cached.result;
}

export function setCachedValidation(
  key: string,
  result: any,
  ttlMinutes: number = 60
): void {
  const expiry = Date.now() + ttlMinutes * 60 * 1000;
  validationCache.set(key, { result, expiry });
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone format (Brazilian)
 */
export function isValidBrazilianPhone(phone: string): boolean {
  const cleaned = cleanNumber(phone);
  // Should be 10 or 11 digits
  return cleaned.length === 10 || cleaned.length === 11;
}

/**
 * Format response for successful validation
 */
export function formatSuccessResponse(data: any) {
  return {
    ...data,
    valid: true,
    timestamp: new Date().toISOString(),
    cache_hit: false
  };
}

/**
 * Get client IP from request
 */
export function getClientIp(req: any): string {
  const forwarded = req.headers['x-forwarded-for'];
  return typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : req.socket?.remoteAddress || 'unknown';
}

/**
 * Rate limiting helper
 */
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
  identifier: string,
  maxRequests: number = 100,
  windowMinutes: number = 15
): boolean {
  const now = Date.now();
  const data = rateLimitMap.get(identifier);

  if (!data || now > data.resetTime) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + windowMinutes * 60 * 1000
    });
    return true;
  }

  if (data.count >= maxRequests) {
    return false;
  }

  data.count++;
  return true;
}

export function getRateLimitStatus(
  identifier: string,
  maxRequests: number = 100
) {
  const data = rateLimitMap.get(identifier);
  if (!data) return { remaining: maxRequests, resetTime: null };
  
  return {
    remaining: Math.max(0, maxRequests - data.count),
    resetTime: new Date(data.resetTime).toISOString()
  };
}

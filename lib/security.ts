// Security utilities for the LightChain trading platform
// Handles input validation, sanitization, and security measures

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  sanitizedValue?: any;
}

// Solana address validation
export function validateSolanaAddress(address: string): ValidationResult {
  const errors: string[] = [];

  if (!address) {
    errors.push('Address is required');
  } else if (typeof address !== 'string') {
    errors.push('Address must be a string');
  } else if (address.length !== 44 && address.length !== 43) {
    // Base58 encoded addresses are typically 44 characters, some are 43
    errors.push('Invalid Solana address length');
  } else if (!/^[1-9A-HJ-NP-Za-km-z]+$/.test(address)) {
    // Base58 alphabet (excluding 0, O, I, l)
    errors.push('Invalid characters in Solana address');
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitizedValue: address.trim()
  };
}

// Token amount validation
export function validateTokenAmount(amount: string | number): ValidationResult {
  const errors: string[] = [];
  let sanitizedAmount: number | undefined;

  try {
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

    if (isNaN(numAmount)) {
      errors.push('Amount must be a valid number');
    } else if (numAmount <= 0) {
      errors.push('Amount must be greater than 0');
    } else if (numAmount > 1e12) { // Reasonable upper limit for token amounts
      errors.push('Amount exceeds maximum allowed value');
    } else if (numAmount < 1e-9) { // Reasonable lower limit for precision
      errors.push('Amount is too small (minimum precision: 1e-9)');
    } else {
      sanitizedAmount = numAmount;
    }
  } catch (error) {
    errors.push('Invalid amount format');
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitizedValue: sanitizedAmount
  };
}

// Price validation
export function validatePrice(price: string | number): ValidationResult {
  const errors: string[] = [];
  let sanitizedPrice: number | undefined;

  try {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;

    if (isNaN(numPrice)) {
      errors.push('Price must be a valid number');
    } else if (numPrice <= 0) {
      errors.push('Price must be greater than 0');
    } else if (numPrice > 1e9) { // Reasonable upper limit for prices
      errors.push('Price exceeds maximum allowed value');
    } else {
      sanitizedPrice = numPrice;
    }
  } catch (error) {
    errors.push('Invalid price format');
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitizedValue: sanitizedPrice
  };
}

// Leverage validation (for perpetual trading)
export function validateLeverage(leverage: string | number): ValidationResult {
  const errors: string[] = [];
  let sanitizedLeverage: number | undefined;

  try {
    const numLeverage = typeof leverage === 'string' ? parseFloat(leverage) : leverage;

    if (isNaN(numLeverage)) {
      errors.push('Leverage must be a valid number');
    } else if (numLeverage < 1) {
      errors.push('Leverage must be at least 1x');
    } else if (numLeverage > 100) { // Reasonable upper limit for leverage
      errors.push('Leverage cannot exceed 100x');
    } else {
      sanitizedLeverage = numLeverage;
    }
  } catch (error) {
    errors.push('Invalid leverage format');
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitizedValue: sanitizedLeverage
  };
}

// Input sanitization for general strings
export function sanitizeString(input: string, maxLength = 1000): ValidationResult {
  const errors: string[] = [];
  let sanitizedValue: string | undefined;

  if (typeof input !== 'string') {
    errors.push('Input must be a string');
  } else {
    // Remove potentially dangerous characters
    const sanitized = input
      .replace(/[<>\"'&]/g, '') // Remove HTML characters
      .replace(/[\x00-\x1F\x7F]/g, '') // Remove control characters
      .trim();

    if (sanitized.length > maxLength) {
      errors.push(`Input exceeds maximum length of ${maxLength} characters`);
    } else if (sanitized.length === 0) {
      errors.push('Input cannot be empty after sanitization');
    } else {
      sanitizedValue = sanitized;
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitizedValue
  };
}

// Rate limiting helper
class RateLimiter {
  private attempts: Map<string, number[]> = new Map();

  isAllowed(key: string, maxAttempts: number, windowMs: number): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(key) || [];

    // Remove old attempts outside the window
    const validAttempts = attempts.filter(time => now - time < windowMs);

    if (validAttempts.length >= maxAttempts) {
      return false;
    }

    validAttempts.push(now);
    this.attempts.set(key, validAttempts);
    return true;
  }

  reset(key: string): void {
    this.attempts.delete(key);
  }
}

export const rateLimiter = new RateLimiter();

// CSRF protection helper (basic implementation)
export function generateCSRFToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Input validation for trading orders
export interface TradingOrderValidation {
  tokenAddress: ValidationResult;
  amount: ValidationResult;
  price?: ValidationResult;
  leverage?: ValidationResult;
  side: ValidationResult;
}

export function validateTradingOrder(order: {
  tokenAddress: string;
  amount: string | number;
  price?: string | number;
  leverage?: string | number;
  side: 'buy' | 'sell';
}): TradingOrderValidation {
  return {
    tokenAddress: validateSolanaAddress(order.tokenAddress),
    amount: validateTokenAmount(order.amount),
    price: order.price ? validatePrice(order.price) : { isValid: true, errors: [] },
    leverage: order.leverage ? validateLeverage(order.leverage) : { isValid: true, errors: [] },
    side: {
      isValid: order.side === 'buy' || order.side === 'sell',
      errors: order.side === 'buy' || order.side === 'sell' ? [] : ['Side must be either "buy" or "sell"'],
      sanitizedValue: order.side
    }
  };
}

// Comprehensive validation result checker
export function hasValidationErrors(validation: Record<string, ValidationResult>): boolean {
  return Object.values(validation).some(result => !result.isValid);
}

export function getAllValidationErrors(validation: Record<string, ValidationResult>): string[] {
  return Object.values(validation).flatMap(result => result.errors);
}
// lib/rate-limit.ts
import { NextRequest, NextResponse } from 'next/server';

interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
  message?: string; // Custom error message
}

interface RequestRecord {
  count: number;
  resetTime: number;
}

// In-memory store for rate limiting (use Redis in production)
const requestStore = new Map<string, RequestRecord>();

// Clean up expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of requestStore.entries()) {
    if (now > record.resetTime) {
      requestStore.delete(key);
    }
  }
}, 5 * 60 * 1000);

export function createRateLimit(config: RateLimitConfig) {
  return function rateLimit(req: NextRequest): NextResponse | null {
    const ip = req.ip || req.headers.get('x-forwarded-for') || 'unknown';
    const key = `${ip}:${req.nextUrl.pathname}`;
    const now = Date.now();
    
    const record = requestStore.get(key);
    
    if (!record || now > record.resetTime) {
      // First request or window expired
      requestStore.set(key, {
        count: 1,
        resetTime: now + config.windowMs
      });
      return null; // Allow request
    }
    
    if (record.count >= config.maxRequests) {
      // Rate limit exceeded
      return new NextResponse(
        JSON.stringify({
          error: config.message || 'Too many requests',
          retryAfter: Math.ceil((record.resetTime - now) / 1000)
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': Math.ceil((record.resetTime - now) / 1000).toString(),
            'X-RateLimit-Limit': config.maxRequests.toString(),
            'X-RateLimit-Remaining': Math.max(0, config.maxRequests - record.count).toString(),
            'X-RateLimit-Reset': new Date(record.resetTime).toISOString()
          }
        }
      );
    }
    
    // Increment counter
    record.count++;
    return null; // Allow request
  };
}

// Predefined rate limiters
export const authRateLimit = createRateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5, // 5 attempts per 15 minutes
  message: 'Too many authentication attempts'
});

export const apiRateLimit = createRateLimit({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 60, // 60 requests per minute
  message: 'API rate limit exceeded'
});

export const uploadRateLimit = createRateLimit({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 10, // 10 uploads per minute
  message: 'Upload rate limit exceeded'
});

export const contactRateLimit = createRateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 3, // 3 contact form submissions per hour
  message: 'Too many contact form submissions'
});

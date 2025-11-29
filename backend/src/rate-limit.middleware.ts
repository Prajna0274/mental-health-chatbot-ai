import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private readonly windowMs = 60_000; // 1 minute
  private readonly max = 30; // 30 requests/minute per IP

  use(req: Request, res: Response, next: NextFunction) {
    const ip = (req.headers['x-forwarded-for'] as string) || req.ip || 'unknown';
    const now = Date.now();
    const bucket = buckets.get(ip);
    if (!bucket || now > bucket.resetAt) {
      buckets.set(ip, { count: 1, resetAt: now + this.windowMs });
      return next();
    }
    if (bucket.count >= this.max) {
      const retryMs = bucket.resetAt - now;
      res.status(429).json({ error: { code: 'rate_limited', message: 'Too many requests', retryAfterMs: retryMs } });
      return;
    }
    bucket.count += 1;
    next();
  }
}

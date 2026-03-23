import fp from 'fastify-plugin';
import { FastifyInstance, FastifyError } from 'fastify';

/**
 * Standardized error payload as per the business specification:
 *   { code: string, message: string, details?: unknown }
 */
export interface AppError {
  code: string;
  message: string;
  details?: unknown;
}

/**
 * Typed application error that carries an HTTP status code.
 */
export class HttpError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
    public details?: unknown,
  ) {
    super(message);
    this.name = 'HttpError';
  }

  toPayload(): AppError {
    return {
      code: this.code,
      message: this.message,
      ...(this.details !== undefined && { details: this.details }),
    };
  }
}

export function notFound(resource: string): HttpError {
  return new HttpError(404, 'NOT_FOUND', `${resource} not found`);
}

export function conflict(message: string): HttpError {
  return new HttpError(409, 'CONFLICT', message);
}

export function badRequest(message: string, details?: unknown): HttpError {
  return new HttpError(400, 'BAD_REQUEST', message, details);
}

async function errorPlugin(fastify: FastifyInstance) {
  fastify.setErrorHandler((error: FastifyError | HttpError, _request, reply) => {
    // Application-level HttpError
    if (error instanceof HttpError) {
      return reply.status(error.statusCode).send(error.toPayload());
    }

    // Fastify validation errors (from JSON Schema validation)
    if (error.validation) {
      const details = error.validation.map((v) => ({
        field: v.instancePath || v.params?.missingProperty || 'unknown',
        message: v.message ?? 'Invalid value',
      }));
      return reply.status(400).send({
        code: 'VALIDATION_ERROR',
        message: 'Request validation failed',
        details,
      });
    }

    // Unexpected errors
    fastify.log.error(error);
    return reply.status(500).send({
      code: 'INTERNAL_ERROR',
      message: 'An unexpected error occurred',
    });
  });
}

export default fp(errorPlugin, { name: 'errors' });

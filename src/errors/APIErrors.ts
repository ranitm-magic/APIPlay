import { APIResponse } from '@playwright/test';

export interface APIErrorResponse {
    field?: string;
    message: string;
    code?: string;
}

export class APIError extends Error {
    public response: APIResponse;
    public statusCode: number;
    public errors: APIErrorResponse[];

    constructor(message: string, response: APIResponse, errors: APIErrorResponse[] = []) {
        super(message);
        this.name = 'APIError';
        this.response = response;
        this.statusCode = response.status();
        this.errors = errors;
    }
}

export class ValidationError extends APIError {
    constructor(response: APIResponse, errors: APIErrorResponse[]) {
        super('Validation failed', response, errors);
        this.name = 'ValidationError';
    }
}

export class AuthenticationError extends APIError {
    constructor(response: APIResponse) {
        super('Authentication failed', response);
        this.name = 'AuthenticationError';
    }
}

export class NotFoundError extends APIError {
    constructor(response: APIResponse) {
        super('Resource not found', response);
        this.name = 'NotFoundError';
    }
}

export class RateLimitError extends APIError {
    constructor(response: APIResponse) {
        super('Rate limit exceeded', response);
        this.name = 'RateLimitError';
    }
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimitError = exports.NotFoundError = exports.AuthenticationError = exports.ValidationError = exports.APIError = void 0;
class APIError extends Error {
    constructor(message, response, errors = []) {
        super(message);
        this.name = 'APIError';
        this.response = response;
        this.statusCode = response.status();
        this.errors = errors;
    }
}
exports.APIError = APIError;
class ValidationError extends APIError {
    constructor(response, errors) {
        super('Validation failed', response, errors);
        this.name = 'ValidationError';
    }
}
exports.ValidationError = ValidationError;
class AuthenticationError extends APIError {
    constructor(response) {
        super('Authentication failed', response);
        this.name = 'AuthenticationError';
    }
}
exports.AuthenticationError = AuthenticationError;
class NotFoundError extends APIError {
    constructor(response) {
        super('Resource not found', response);
        this.name = 'NotFoundError';
    }
}
exports.NotFoundError = NotFoundError;
class RateLimitError extends APIError {
    constructor(response) {
        super('Rate limit exceeded', response);
        this.name = 'RateLimitError';
    }
}
exports.RateLimitError = RateLimitError;

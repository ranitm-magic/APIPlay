import { APIRequestContext, APIResponse } from '@playwright/test';
import { TokenManager } from '../utils/TokenManager';
import { 
    APIError, 
    ValidationError, 
    AuthenticationError, 
    NotFoundError, 
    RateLimitError,
    APIErrorResponse 
} from '../errors/APIErrors';

export interface RequestOptions {
    headers?: Record<string, string>;
    data?: any;
    params?: Record<string, string>;
}

export class APIClient {
    private request: APIRequestContext;
    private baseUrl: string;

    constructor(request: APIRequestContext, baseUrl: string) {
        this.request = request;
        this.baseUrl = baseUrl;
    }

    private buildUrl(endpoint: string, params?: Record<string, string>): string {
        let url = `${this.baseUrl}${endpoint}`;
        if (params) {
            const queryParams = new URLSearchParams(params);
            url += `?${queryParams.toString()}`;
        }
        return url;
    }

    private mergeHeaders(customHeaders?: Record<string, string>): Record<string, string> {
        const token = TokenManager.getInstance().getToken();
        const authHeaders: Record<string, string> = token ? { 'Authorization': `Bearer ${token}` } : {};
        return {
            'Content-Type': 'application/json',
            ...authHeaders,
            ...customHeaders
        };
    }

    private async handleErrorResponse(response: APIResponse): Promise<never> {
        const statusCode = response.status();
        const responseBody = await response.json().catch(() => null);
        const errors = responseBody?.errors || [];

        switch (statusCode) {
            case 400:
                throw new ValidationError(response, errors);
            case 401:
                throw new AuthenticationError(response);
            case 404:
                throw new NotFoundError(response);
            case 429:
                throw new RateLimitError(response);
            default:
                throw new APIError(`API Error: ${response.statusText()}`, response, errors);
        }
    }

    private async handleResponse<T>(response: APIResponse): Promise<T> {
        if (!response.ok()) {
            await this.handleErrorResponse(response);
        }
        return response.json();
    }

    protected async GET<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
        const url = this.buildUrl(endpoint, options.params);
        const headers = this.mergeHeaders(options.headers);
        const response = await this.request.get(url, {
            headers
        });
        return this.handleResponse<T>(response);
    }

    protected async POST<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
        const url = this.buildUrl(endpoint, options.params);
        const headers = this.mergeHeaders(options.headers);
        const response = await this.request.post(url, {
            headers,
            data: options.data
        });
        return this.handleResponse<T>(response);
    }

    protected async PUT<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
        const url = this.buildUrl(endpoint, options.params);
        const headers = this.mergeHeaders(options.headers);
        const response = await this.request.put(url, {
            headers,
            data: options.data
        });
        return this.handleResponse<T>(response);
    }

    protected async DELETE<T>(endpoint: string, options: RequestOptions = {}): Promise<T | void> {
        const url = this.buildUrl(endpoint, options.params);
        const headers = this.mergeHeaders(options.headers);
        const response = await this.request.delete(url, {
            headers
        });
        if (response.ok() && response.status() === 204) {
            return;
        }
        return this.handleResponse<T>(response);
    }

    
}
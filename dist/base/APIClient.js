"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIClient = void 0;
const TokenManager_1 = require("../utils/TokenManager");
const APIErrors_1 = require("../errors/APIErrors");
class APIClient {
    constructor(request, baseUrl) {
        this.request = request;
        this.baseUrl = baseUrl;
    }
    buildUrl(endpoint, params) {
        let url = `${this.baseUrl}${endpoint}`;
        if (params) {
            const queryParams = new URLSearchParams(params);
            url += `?${queryParams.toString()}`;
        }
        return url;
    }
    mergeHeaders(customHeaders) {
        const token = TokenManager_1.TokenManager.getInstance().getToken();
        const authHeaders = token ? { 'Authorization': `Bearer ${token}` } : {};
        return {
            'Content-Type': 'application/json',
            ...authHeaders,
            ...customHeaders
        };
    }
    async handleErrorResponse(response) {
        const statusCode = response.status();
        const responseBody = await response.json().catch(() => null);
        const errors = responseBody?.errors || [];
        switch (statusCode) {
            case 400:
                throw new APIErrors_1.ValidationError(response, errors);
            case 401:
                throw new APIErrors_1.AuthenticationError(response);
            case 404:
                throw new APIErrors_1.NotFoundError(response);
            case 429:
                throw new APIErrors_1.RateLimitError(response);
            default:
                throw new APIErrors_1.APIError(`API Error: ${response.statusText()}`, response, errors);
        }
    }
    async handleResponse(response) {
        if (!response.ok()) {
            await this.handleErrorResponse(response);
        }
        return response.json();
    }
    async GET(endpoint, options = {}) {
        const url = this.buildUrl(endpoint, options.params);
        const headers = this.mergeHeaders(options.headers);
        const response = await this.request.get(url, {
            headers
        });
        const data = await this.handleResponse(response);
        return { data, response };
    }
    async POST(endpoint, options = {}) {
        const url = this.buildUrl(endpoint, options.params);
        const headers = this.mergeHeaders(options.headers);
        const response = await this.request.post(url, {
            headers,
            data: options.data
        });
        const data = await this.handleResponse(response);
        return { data, response };
    }
    async PUT(endpoint, options = {}) {
        const url = this.buildUrl(endpoint, options.params);
        const headers = this.mergeHeaders(options.headers);
        const response = await this.request.put(url, {
            headers,
            data: options.data
        });
        const data = await this.handleResponse(response);
        return { data, response };
    }
    async DELETE(endpoint, options = {}) {
        const url = this.buildUrl(endpoint, options.params);
        const headers = this.mergeHeaders(options.headers);
        const response = await this.request.delete(url, {
            headers
        });
        const data = response.ok() && response.status() === 204
            ? undefined
            : await this.handleResponse(response);
        return { data, response };
    }
}
exports.APIClient = APIClient;

import { APIClient, RequestOptions } from '../base/APIClient';
import { APIRequestContext } from '@playwright/test';
import { TokenManager } from '../utils/TokenManager';

interface LoginResponse {
    token: string;
    // Add other response fields as needed
}

interface LoginCredentials {
    username: string;
    password: string;
}

export class AuthService extends APIClient {
    constructor(request: APIRequestContext, baseUrl: string) {
        super(request, baseUrl);
    }

    async login(credentials: LoginCredentials) {
        const response = await this.POST('/auth/login', {
            data: credentials
        });
        
        const loginResponse = await response.json() as LoginResponse;
        TokenManager.getInstance().setToken(loginResponse.token);
        
        return response;
    }

    async logout() {
        const response = await this.POST('/auth/logout', {
            headers: this.getAuthHeaders()
        });
        TokenManager.getInstance().clearToken();
        return response;
    }

    private getAuthHeaders(): Record<string, string> {
        const token = TokenManager.getInstance().getToken();
        return token ? { 'Authorization': `Bearer ${token}` } : {};
    }
}
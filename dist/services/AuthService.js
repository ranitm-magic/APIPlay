"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const APIClient_1 = require("../base/APIClient");
const TokenManager_1 = require("../utils/TokenManager");
class AuthService extends APIClient_1.APIClient {
    constructor(request, baseUrl) {
        super(request, baseUrl);
    }
    async login(credentials) {
        const response = await this.POST('/auth/login', {
            data: credentials
        });
        const loginResponse = await response.json();
        TokenManager_1.TokenManager.getInstance().setToken(loginResponse.token);
        return response;
    }
    async logout() {
        const response = await this.POST('/auth/logout', {
            headers: this.getAuthHeaders()
        });
        TokenManager_1.TokenManager.getInstance().clearToken();
        return response;
    }
    getAuthHeaders() {
        const token = TokenManager_1.TokenManager.getInstance().getToken();
        return token ? { 'Authorization': `Bearer ${token}` } : {};
    }
}
exports.AuthService = AuthService;

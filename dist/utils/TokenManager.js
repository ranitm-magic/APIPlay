"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenManager = void 0;
class TokenManager {
    constructor() {
        this.token = '130341095c15452aaa7d978429832d363efb64110b29cda4b5aebc9c2bb739a6';
    }
    static getInstance() {
        if (!TokenManager.instance) {
            TokenManager.instance = new TokenManager();
        }
        return TokenManager.instance;
    }
    setToken(token) {
        this.token = token;
    }
    getToken() {
        return this.token;
    }
    clearToken() {
        this.token = '';
    }
}
exports.TokenManager = TokenManager;

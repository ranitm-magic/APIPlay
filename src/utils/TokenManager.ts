export class TokenManager {
    private static instance: TokenManager;
    private token: string = '130341095c15452aaa7d978429832d363efb64110b29cda4b5aebc9c2bb739a6';

    private constructor() {}

    public static getInstance(): TokenManager {
        if (!TokenManager.instance) {
            TokenManager.instance = new TokenManager();
        }
        return TokenManager.instance;
    }

    setToken(token: string) {
        this.token = token;
    }

    getToken(): string | null {
        return this.token;
    }

    clearToken() {
        this.token = '';
    }
}
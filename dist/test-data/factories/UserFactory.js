"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFactory = void 0;
class UserFactory {
    static createRandomUser(overrides = {}) {
        return {
            name: `Test User ${Date.now()}`,
            email: `test${Date.now()}@example.com`,
            gender: 'male',
            status: 'active',
            ...overrides
        };
    }
    static createInactiveUser(overrides = {}) {
        return this.createRandomUser({ status: 'inactive', ...overrides });
    }
    static createFemaleUser(overrides = {}) {
        return this.createRandomUser({ gender: 'female', ...overrides });
    }
    static createUserWithSpecificEmail(email, overrides = {}) {
        return this.createRandomUser({ email, ...overrides });
    }
}
exports.UserFactory = UserFactory;

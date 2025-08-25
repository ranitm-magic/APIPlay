import { GoRestUser } from '../../services/GoRestService';

export class UserFactory {
    static createRandomUser(overrides: Partial<GoRestUser> = {}): GoRestUser {
        return {
            name: `Test User ${Date.now()}`,
            email: `test${Date.now()}@example.com`,
            gender: 'male',
            status: 'active',
            ...overrides
        };
    }

    static createInactiveUser(overrides: Partial<GoRestUser> = {}): GoRestUser {
        return this.createRandomUser({ status: 'inactive', ...overrides });
    }

    static createFemaleUser(overrides: Partial<GoRestUser> = {}): GoRestUser {
        return this.createRandomUser({ gender: 'female', ...overrides });
    }

    static createUserWithSpecificEmail(email: string, overrides: Partial<GoRestUser> = {}): GoRestUser {
        return this.createRandomUser({ email, ...overrides });
    }
}

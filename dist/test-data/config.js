"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TEST_DATA = exports.TEST_CONFIG = void 0;
exports.TEST_CONFIG = {
    api: {
        baseUrl: 'https://gorest.co.in/public/v2',
        defaultTimeout: 30000,
        retryCount: 3,
    },
    test: {
        cleanup: true, // whether to clean up test data after tests
        parallel: false // whether tests can run in parallel
    }
};
exports.TEST_DATA = {
    users: {
        default: {
            name: 'Default Test User',
            email: `default.test.${Date.now()}@example.com`,
            gender: 'male',
            status: 'active'
        }
    }
};

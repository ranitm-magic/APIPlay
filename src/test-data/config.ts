export const TEST_CONFIG = {
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

export const TEST_DATA = {
    users: {
        default: {
            name: 'Default Test User',
            email: `default.test.${Date.now()}@example.com`,
            gender: 'male' as const,
            status: 'active' as const
        }
    }
};

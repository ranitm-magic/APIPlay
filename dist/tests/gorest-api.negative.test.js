"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const GoRestService_1 = require("../services/GoRestService");
test_1.test.describe('GoRest API Negative Test Scenarios', () => {
    (0, test_1.test)('should fail to create user with invalid email format', async ({ request }) => {
        const goRestService = new GoRestService_1.GoRestService(request);
        const invalidUser = {
            name: 'Test User',
            email: 'invalid-email', // Invalid email format
            gender: 'male',
            status: 'active'
        };
        try {
            await goRestService.createUser(invalidUser);
            throw new Error('Should have failed to create user with invalid email');
        }
        catch (error) {
            const errorBody = await error.response.json();
            console.log('\n[Negative Test] Create user with invalid email failed as expected');
            console.log('Error Status:', error.response.status());
            console.log('Error Details:', JSON.stringify(errorBody, null, 2));
            (0, test_1.expect)(error.response.status()).toBe(422);
            (0, test_1.expect)(errorBody[0].field).toBe('email');
            (0, test_1.expect)(errorBody[0].message).toContain('invalid');
        }
    });
    (0, test_1.test)('should fail to create user with missing required fields', async ({ request }) => {
        const goRestService = new GoRestService_1.GoRestService(request);
        const invalidUser = {
            name: 'Test User'
        };
        try {
            await goRestService.createUser(invalidUser);
            throw new Error('Should have failed to create user with missing fields');
        }
        catch (error) {
            const errorBody = await error.response.json();
            console.log('\n[Negative Test] Create user with missing fields failed as expected');
            console.log('Error Status:', error.response.status());
            console.log('Error Response:', JSON.stringify(errorBody, null, 2));
            console.log('Missing Fields:', errorBody.map((err) => err.field).join(', '));
            (0, test_1.expect)(error.response.status()).toBe(422);
            (0, test_1.expect)(errorBody).toContainEqual(test_1.expect.objectContaining({
                field: 'email'
            }));
        }
    });
    (0, test_1.test)('should fail to get user with non-existent ID', async ({ request }) => {
        const goRestService = new GoRestService_1.GoRestService(request);
        const nonExistentId = 99999999;
        try {
            await goRestService.getUserById(nonExistentId);
            throw new Error('Should have failed to get non-existent user');
        }
        catch (error) {
            console.log(`\n[Negative Test] Get non-existent user ${nonExistentId} failed as expected`);
            console.log('Error Status:', error.response.status());
            console.log('Status Text:', error.response.statusText());
            try {
                const errorBody = await error.response.json();
                console.log('Error Response:', JSON.stringify(errorBody, null, 2));
            }
            catch {
                console.log('No error body received');
            }
            (0, test_1.expect)(error.response.status()).toBe(404);
        }
    });
    (0, test_1.test)('should fail to update user with invalid gender', async ({ request }) => {
        const goRestService = new GoRestService_1.GoRestService(request);
        const validUser = {
            name: 'Test User',
            email: `test${Date.now()}@example.com`,
            gender: 'male',
            status: 'active'
        };
        const createdUser = await goRestService.createUser(validUser);
        console.log(`[Negative Test] Created test user with ID: ${createdUser.id}`);
        try {
            await goRestService.updateUser(createdUser.id, {
                gender: 'invalid_gender'
            });
            throw new Error('Should have failed to update user with invalid gender');
        }
        catch (error) {
            const errorBody = await error.response.json();
            console.log('\n[Negative Test] Update user with invalid gender failed as expected');
            console.log('Error Status:', error.response.status());
            console.log('Error Details:', JSON.stringify(errorBody, null, 2));
            console.log('Invalid Field:', errorBody[0].field);
            console.log('Error Message:', errorBody[0].message);
            (0, test_1.expect)(error.response.status()).toBe(422);
            (0, test_1.expect)(errorBody[0].field).toBe('gender');
        }
        finally {
            await goRestService.deleteUser(createdUser.id);
            console.log(`[Negative Test] Cleaned up - deleted user with ID: ${createdUser.id}`);
        }
    });
    (0, test_1.test)('should fail to delete non-existent user', async ({ request }) => {
        const goRestService = new GoRestService_1.GoRestService(request);
        const nonExistentId = 99999999;
        try {
            await goRestService.deleteUser(nonExistentId);
            throw new Error('Should have failed to delete non-existent user');
        }
        catch (error) {
            if (error.response) {
                console.log(`\n[Negative Test] Delete non-existent user ${nonExistentId} failed as expected`);
                console.log('Error Status:', error.response.status());
                console.log('Status Text:', error.response.statusText());
                try {
                    const errorBody = await error.response.json();
                    console.log('Error Response:', JSON.stringify(errorBody, null, 2));
                }
                catch {
                    console.log('No error body received');
                }
                (0, test_1.expect)(error.response.status()).toBe(404);
            }
            else {
                console.log('Unexpected error:', error);
                throw error;
            }
        }
    });
    (0, test_1.test)('should fail to create user with duplicate email', async ({ request }) => {
        const goRestService = new GoRestService_1.GoRestService(request);
        const email = `test${Date.now()}@example.com`;
        // Create first user
        const firstUser = {
            name: 'First User',
            email: email,
            gender: 'male',
            status: 'active'
        };
        const createdUser = await goRestService.createUser(firstUser);
        console.log(`[Negative Test] Created first user with ID: ${createdUser.id}`);
        try {
            // Try to create second user with same email
            const duplicateUser = {
                name: 'Second User',
                email: email, // Same email as first user
                gender: 'male',
                status: 'active'
            };
            await goRestService.createUser(duplicateUser);
            throw new Error('Should have failed to create user with duplicate email');
        }
        catch (error) {
            const errorBody = await error.response.json();
            console.log('\n[Negative Test] Create user with duplicate email failed as expected');
            console.log('Error Status:', error.response.status());
            console.log('Error Details:', JSON.stringify(errorBody, null, 2));
            console.log('Duplicate Field:', errorBody[0].field);
            console.log('Error Message:', errorBody[0].message);
            (0, test_1.expect)(error.response.status()).toBe(422);
            (0, test_1.expect)(errorBody[0].field).toBe('email');
            (0, test_1.expect)(errorBody[0].message).toContain('taken');
        }
        finally {
            // Clean up
            await goRestService.deleteUser(createdUser.id);
            console.log(`[Negative Test] Cleaned up - deleted user with ID: ${createdUser.id}`);
        }
    });
    (0, test_1.test)('should fail to update non-existent user', async ({ request }) => {
        const goRestService = new GoRestService_1.GoRestService(request);
        const nonExistentId = 99999999;
        try {
            await goRestService.updateUser(nonExistentId, {
                name: 'Updated Name'
            });
            throw new Error('Should have failed to update non-existent user');
        }
        catch (error) {
            console.log(`\n[Negative Test] Update non-existent user ${nonExistentId} failed as expected`);
            console.log('Error Status:', error.response.status());
            console.log('Status Text:', error.response.statusText());
            try {
                const errorBody = await error.response.json();
                console.log('Error Response:', JSON.stringify(errorBody, null, 2));
            }
            catch {
                console.log('No error body received');
            }
            (0, test_1.expect)(error.response.status()).toBe(404);
        }
    });
});

import { test, expect, APIRequestContext } from '@playwright/test';
import { GoRestService, GoRestUser } from '../services/GoRestService';

test.describe('GoRest API Negative Test Scenarios', () => {
    test('should fail to create user with invalid email format', async ({ request }) => {
        const goRestService = new GoRestService(request);
        const invalidUser: GoRestUser = {
            name: 'Test User',
            email: 'invalid-email', // Invalid email format
            gender: 'male',
            status: 'active'
        };

        try {
            await goRestService.createUser(invalidUser);
            throw new Error('Should have failed to create user with invalid email');
        } catch (error: any) {
            const errorBody = await error.response.json();
            console.log('\n[Negative Test] Create user with invalid email failed as expected');
            console.log('Error Status:', error.response.status());
            console.log('Error Details:', JSON.stringify(errorBody, null, 2));
            
            expect(error.response.status()).toBe(422);
            expect(errorBody[0].field).toBe('email');
            expect(errorBody[0].message).toContain('invalid');
        }
    });

    test('should fail to create user with missing required fields', async ({ request }) => {
        const goRestService = new GoRestService(request);
        const invalidUser = {
            name: 'Test User'
        } as any;

        try {
            await goRestService.createUser(invalidUser);
            throw new Error('Should have failed to create user with missing fields');
        } catch (error: any) {
            const errorBody = await error.response.json();
            console.log('\n[Negative Test] Create user with missing fields failed as expected');
            console.log('Error Status:', error.response.status());
            console.log('Error Response:', JSON.stringify(errorBody, null, 2));
            console.log('Missing Fields:', errorBody.map((err: any) => err.field).join(', '));
            
            expect(error.response.status()).toBe(422);
            expect(errorBody).toContainEqual(expect.objectContaining({
                field: 'email'
            }));
        }
    });

    test('should fail to get user with non-existent ID', async ({ request }) => {
        const goRestService = new GoRestService(request);
        const nonExistentId = 99999999; 

        try {
            await goRestService.getUserById(nonExistentId);
            throw new Error('Should have failed to get non-existent user');
        } catch (error: any) {
            console.log(`\n[Negative Test] Get non-existent user ${nonExistentId} failed as expected`);
            console.log('Error Status:', error.response.status());
            console.log('Status Text:', error.response.statusText());
            try {
                const errorBody = await error.response.json();
                console.log('Error Response:', JSON.stringify(errorBody, null, 2));
            } catch {
                console.log('No error body received');
            }
            expect(error.response.status()).toBe(404);
        }
    });

    test('should fail to update user with invalid gender', async ({ request }) => {
        
        const goRestService = new GoRestService(request);
        const validUser: GoRestUser = {
            name: 'Test User',
            email: `test${Date.now()}@example.com`,
            gender: 'male',
            status: 'active'
        };

        const createdUser = await goRestService.createUser(validUser);
        console.log(`[Negative Test] Created test user with ID: ${createdUser.id}`);

        try {
            await goRestService.updateUser(createdUser.id, {
                gender: 'invalid_gender' as any 
            });
            throw new Error('Should have failed to update user with invalid gender');
        } catch (error: any) {
            const errorBody = await error.response.json();
            console.log('\n[Negative Test] Update user with invalid gender failed as expected');
            console.log('Error Status:', error.response.status());
            console.log('Error Details:', JSON.stringify(errorBody, null, 2));
            console.log('Invalid Field:', errorBody[0].field);
            console.log('Error Message:', errorBody[0].message);
            
            expect(error.response.status()).toBe(422);
            expect(errorBody[0].field).toBe('gender');
        } finally {
           
            await goRestService.deleteUser(createdUser.id);
            console.log(`[Negative Test] Cleaned up - deleted user with ID: ${createdUser.id}`);
        }
    });

    test('should fail to delete non-existent user', async ({ request }) => {
        const goRestService = new GoRestService(request);
        const nonExistentId = 99999999;

        try {
            await goRestService.deleteUser(nonExistentId);
            throw new Error('Should have failed to delete non-existent user');
        } catch (error: any) {
            if (error.response) {
                console.log(`\n[Negative Test] Delete non-existent user ${nonExistentId} failed as expected`);
                console.log('Error Status:', error.response.status());
                console.log('Status Text:', error.response.statusText());
                try {
                    const errorBody = await error.response.json();
                    console.log('Error Response:', JSON.stringify(errorBody, null, 2));
                } catch {
                    console.log('No error body received');
                }
                expect(error.response.status()).toBe(404);
            } else {
                console.log('Unexpected error:', error);
                throw error;
            }
        }
    });

    test('should fail to create user with duplicate email', async ({ request }) => {
        const goRestService = new GoRestService(request);
        const email = `test${Date.now()}@example.com`;
        
        // Create first user
        const firstUser: GoRestUser = {
            name: 'First User',
            email: email,
            gender: 'male',
            status: 'active'
        };

        const createdUser = await goRestService.createUser(firstUser);
        console.log(`[Negative Test] Created first user with ID: ${createdUser.id}`);

        try {
            // Try to create second user with same email
            const duplicateUser: GoRestUser = {
                name: 'Second User',
                email: email, // Same email as first user
                gender: 'male',
                status: 'active'
            };

            await goRestService.createUser(duplicateUser);
            throw new Error('Should have failed to create user with duplicate email');
        } catch (error: any) {
            const errorBody = await error.response.json();
            console.log('\n[Negative Test] Create user with duplicate email failed as expected');
            console.log('Error Status:', error.response.status());
            console.log('Error Details:', JSON.stringify(errorBody, null, 2));
            console.log('Duplicate Field:', errorBody[0].field);
            console.log('Error Message:', errorBody[0].message);
            
            expect(error.response.status()).toBe(422);
            expect(errorBody[0].field).toBe('email');
            expect(errorBody[0].message).toContain('taken');
        } finally {
            // Clean up
            await goRestService.deleteUser(createdUser.id);
            console.log(`[Negative Test] Cleaned up - deleted user with ID: ${createdUser.id}`);
        }
    });

    test('should fail to update non-existent user', async ({ request }) => {
        const goRestService = new GoRestService(request);
        const nonExistentId = 99999999;

        try {
            await goRestService.updateUser(nonExistentId, {
                name: 'Updated Name'
            });
            throw new Error('Should have failed to update non-existent user');
        } catch (error: any) {
            console.log(`\n[Negative Test] Update non-existent user ${nonExistentId} failed as expected`);
            console.log('Error Status:', error.response.status());
            console.log('Status Text:', error.response.statusText());
            try {
                const errorBody = await error.response.json();
                console.log('Error Response:', JSON.stringify(errorBody, null, 2));
            } catch {
                console.log('No error body received');
            }
            expect(error.response.status()).toBe(404);
        }
    });
});
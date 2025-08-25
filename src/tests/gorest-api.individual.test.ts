import { test, expect, APIRequestContext } from '@playwright/test';
import { GoRestService, GoRestUser } from '../services/GoRestService';

// Helper function to create a test user and return their ID
async function createTestUser(request: APIRequestContext): Promise<number> {
    const goRestService = new GoRestService(request);
    const randomEmail = `test${Date.now()}@example.com`;
    const newUser: GoRestUser = {
        name: 'Test User',
        email: randomEmail,
        gender: 'male',
        status: 'active'
    };

    const createdUser = await goRestService.createUser(newUser);
    console.log(`[Helper] Created test user with ID: ${createdUser.id}`);
    return createdUser.id;
}

// Individual test cases that can be run independently
test.describe('GoRest API Independent Tests', () => {
    test('should create a new user', async ({ request }) => {
        const goRestService = new GoRestService(request);
        const randomEmail = `test${Date.now()}@example.com`;
        const newUser: GoRestUser = {
            name: 'Ranit Mondal',
            email: randomEmail,
            gender: 'male',
            status: 'active'
        };

        const createdUser = await goRestService.createUser(newUser);
        expect(createdUser.id).toBeTruthy();
        expect(createdUser.name).toBe(newUser.name);
        expect(createdUser.email).toBe(newUser.email);
        expect(createdUser.gender).toBe(newUser.gender);
        expect(createdUser.status).toBe(newUser.status);
        console.log(`[Create Test] Successfully created user with ID: ${createdUser.id}`);

        // Clean up
        await goRestService.deleteUser(createdUser.id);
        console.log(`[Create Test] Cleaned up - deleted user with ID: ${createdUser.id}`);
    });

    test('should get user by ID', async ({ request }) => {
        // Create a test user first
        const userId = await createTestUser(request);
        
        const goRestService = new GoRestService(request);
        const user = await goRestService.getUserById(userId);
        
        expect(user.id).toBe(userId);
        expect(user.name).toBe('Test User');
        console.log(`[Get Test] Successfully retrieved user with ID: ${userId}`);

        // Clean up
        await goRestService.deleteUser(userId);
        console.log(`[Get Test] Cleaned up - deleted user with ID: ${userId}`);
    });

    test('should update user details', async ({ request }) => {
        // Create a test user first
        const userId = await createTestUser(request);
        
        const goRestService = new GoRestService(request);
        const updateData: Partial<GoRestUser> = {
            name: 'Updated Test User',
            status: 'inactive'
        };

        const updatedUser = await goRestService.updateUser(userId, updateData);
        expect(updatedUser.name).toBe(updateData.name);
        expect(updatedUser.status).toBe(updateData.status);
        console.log(`[Update Test] Successfully updated user with ID: ${userId}`);
        console.log(`[Update Test] New name: ${updatedUser.name}, New status: ${updatedUser.status}`);

        // Clean up
        await goRestService.deleteUser(userId);
        console.log(`[Update Test] Cleaned up - deleted user with ID: ${userId}`);
    });

    test('should delete a user', async ({ request }) => {
        // Create a test user first
        const userId = await createTestUser(request);
        
        const goRestService = new GoRestService(request);

        // Verify user exists
        const userBeforeDelete = await goRestService.getUserById(userId);
        expect(userBeforeDelete.id).toBe(userId);

        // Delete the user
        console.log(`[Delete Test] Attempting to delete user with ID: ${userId}`);
        await goRestService.deleteUser(userId);
        console.log(`[Delete Test] Successfully deleted user`);

        // Verify user no longer exists
        try {
            await goRestService.getUserById(userId);
            throw new Error('User should not exist after deletion');
        } catch (error: any) {
            console.log(`[Delete Test] Verified user ${userId} no longer exists in DB`);
            expect(error.response?.status()).toBe(404);
        }
    });
});
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const GoRestService_1 = require("../services/GoRestService");
// Helper function to create a test user and return their ID
async function createTestUser(request) {
    const goRestService = new GoRestService_1.GoRestService(request);
    const randomEmail = `test${Date.now()}@example.com`;
    const newUser = {
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
test_1.test.describe('GoRest API Independent Tests', () => {
    (0, test_1.test)('should create a new user', async ({ request }) => {
        const goRestService = new GoRestService_1.GoRestService(request);
        const randomEmail = `test${Date.now()}@example.com`;
        const newUser = {
            name: 'Ranit Mondal',
            email: randomEmail,
            gender: 'male',
            status: 'active'
        };
        const createdUser = await goRestService.createUser(newUser);
        (0, test_1.expect)(createdUser.id).toBeTruthy();
        (0, test_1.expect)(createdUser.name).toBe(newUser.name);
        (0, test_1.expect)(createdUser.email).toBe(newUser.email);
        (0, test_1.expect)(createdUser.gender).toBe(newUser.gender);
        (0, test_1.expect)(createdUser.status).toBe(newUser.status);
        console.log(`[Create Test] Successfully created user with ID: ${createdUser.id}`);
        // Clean up
        await goRestService.deleteUser(createdUser.id);
        console.log(`[Create Test] Cleaned up - deleted user with ID: ${createdUser.id}`);
    });
    (0, test_1.test)('should get user by ID', async ({ request }) => {
        // Create a test user first
        const userId = await createTestUser(request);
        const goRestService = new GoRestService_1.GoRestService(request);
        const user = await goRestService.getUserById(userId);
        (0, test_1.expect)(user.id).toBe(userId);
        (0, test_1.expect)(user.name).toBe('Test User');
        console.log(`[Get Test] Successfully retrieved user with ID: ${userId}`);
        // Clean up
        await goRestService.deleteUser(userId);
        console.log(`[Get Test] Cleaned up - deleted user with ID: ${userId}`);
    });
    (0, test_1.test)('should update user details', async ({ request }) => {
        // Create a test user first
        const userId = await createTestUser(request);
        const goRestService = new GoRestService_1.GoRestService(request);
        const updateData = {
            name: 'Updated Test User',
            status: 'inactive'
        };
        const updatedUser = await goRestService.updateUser(userId, updateData);
        (0, test_1.expect)(updatedUser.name).toBe(updateData.name);
        (0, test_1.expect)(updatedUser.status).toBe(updateData.status);
        console.log(`[Update Test] Successfully updated user with ID: ${userId}`);
        console.log(`[Update Test] New name: ${updatedUser.name}, New status: ${updatedUser.status}`);
        // Clean up
        await goRestService.deleteUser(userId);
        console.log(`[Update Test] Cleaned up - deleted user with ID: ${userId}`);
    });
    (0, test_1.test)('should delete a user', async ({ request }) => {
        // Create a test user first
        const userId = await createTestUser(request);
        const goRestService = new GoRestService_1.GoRestService(request);
        // Verify user exists
        const userBeforeDelete = await goRestService.getUserById(userId);
        (0, test_1.expect)(userBeforeDelete.id).toBe(userId);
        // Delete the user
        console.log(`[Delete Test] Attempting to delete user with ID: ${userId}`);
        await goRestService.deleteUser(userId);
        console.log(`[Delete Test] Successfully deleted user`);
        // Verify user no longer exists
        try {
            await goRestService.getUserById(userId);
            throw new Error('User should not exist after deletion');
        }
        catch (error) {
            console.log(`[Delete Test] Verified user ${userId} no longer exists in DB`);
            (0, test_1.expect)(error.response?.status()).toBe(404);
        }
    });
});

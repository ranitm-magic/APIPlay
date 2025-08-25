import { test, expect, APIRequestContext } from '@playwright/test';
import { GoRestService, GoRestUser, GoRestResponse } from '../services/GoRestService';
import { UserFactory } from '../test-data/factories/UserFactory';

test.describe.serial('GoRest API Sequential Tests', () => {
    let createdUserId: number;
    let testUser: GoRestUser;



    const createService = (request: APIRequestContext) => {
        return new GoRestService(request);
    }

    test('should create a new user', async ({ request }) => {
        const goRestService = createService(request);
        testUser = UserFactory.createRandomUser();
        
        const createdUser = await goRestService.createUser(testUser);
        expect(createdUser.id).toBeTruthy();
        expect(createdUser.name).toBe(testUser.name);
        expect(createdUser.email).toBe(testUser.email);
        expect(createdUser.gender).toBe(testUser.gender);
        expect(createdUser.status).toBe(testUser.status);
        
        createdUserId = createdUser.id;
        console.log(`Created user with ID: ${createdUserId}`);
    });

    test('should get created user by ID', async ({ request }) => {
        const goRestService = createService(request);
        const user = await goRestService.getUserById(createdUserId);
        
        expect(user.id).toBe(createdUserId);
        expect(user.name).toBe(testUser.name);
    });

    test('should update user details', async ({ request }) => {
        const goRestService = createService(request);
        const updateData: Partial<GoRestUser> = {
            name: 'Ranit Mondal Updated',
            status: 'inactive'
        };

        const updatedUser = await goRestService.updateUser(createdUserId, updateData);
        expect(updatedUser.name).toBe(updateData.name);
        expect(updatedUser.status).toBe(updateData.status);
    });

    test('should delete the created user', async ({ request }) => {
        const goRestService = createService(request);
        
        const userBeforeDelete = await goRestService.getUserById(createdUserId)
        expect(userBeforeDelete.id).toBe(createdUserId);

        await goRestService.deleteUser(createdUserId);
        console.log(`Deleted user with ID: ${createdUserId}`);

        try {
            await goRestService.getUserById(createdUserId);
            throw new Error('User should not exist after deletion')
        } catch (error: any) {
            expect(error.response?.status()).toBe(404)
        }
    })
})
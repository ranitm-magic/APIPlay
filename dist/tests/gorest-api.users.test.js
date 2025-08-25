"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const GoRestService_1 = require("../services/GoRestService");
const UserFactory_1 = require("../test-data/factories/UserFactory");
const APIAssertions_1 = require("../utils/APIAssertions");
test_1.test.describe.serial('GoRest API Sequential Tests', () => {
    let createdUserId;
    let testUser;
    const createService = (request) => {
        return new GoRestService_1.GoRestService(request);
    };
    (0, test_1.test)('should create a new user', async ({ request }) => {
        const goRestService = createService(request);
        testUser = UserFactory_1.UserFactory.createRandomUser();
        const { data: createdUser, response } = await goRestService.createUser(testUser);
        // Assert response status
        await APIAssertions_1.APIAssertions.assertCreated(response);
        // Assert response data
        (0, test_1.expect)(createdUser.id).toBeTruthy();
        (0, test_1.expect)(createdUser.name).toBe(testUser.name);
        (0, test_1.expect)(createdUser.email).toBe(testUser.email);
        (0, test_1.expect)(createdUser.gender).toBe(testUser.gender);
        (0, test_1.expect)(createdUser.status).toBe(testUser.status);
        createdUserId = createdUser.id;
        console.log(`Created user with ID: ${createdUserId}`);
    });
    (0, test_1.test)('should get created user by ID', async ({ request }) => {
        const goRestService = createService(request);
        const { data: user, response } = await goRestService.getUserById(createdUserId);
        // Assert response status
        await APIAssertions_1.APIAssertions.assertOk(response);
        // Assert response data
        (0, test_1.expect)(user.id).toBe(createdUserId);
        (0, test_1.expect)(user.name).toBe(testUser.name);
    });
    (0, test_1.test)('should update user details', async ({ request }) => {
        const goRestService = createService(request);
        const updateData = {
            name: 'Ranit Mondal Updated',
            status: 'inactive'
        };
        const { data: updatedUser, response } = await goRestService.updateUser(createdUserId, updateData);
        // Assert response status
        await APIAssertions_1.APIAssertions.assertOk(response);
        // Assert response data
        (0, test_1.expect)(updatedUser.name).toBe(updateData.name);
        (0, test_1.expect)(updatedUser.status).toBe(updateData.status);
    });
    (0, test_1.test)('should delete the created user', async ({ request }) => {
        const goRestService = createService(request);
        const { data: userBeforeDelete, response: getResponse } = await goRestService.getUserById(createdUserId);
        await APIAssertions_1.APIAssertions.assertOk(getResponse);
        (0, test_1.expect)(userBeforeDelete.id).toBe(createdUserId);
        const { response: deleteResponse } = await goRestService.deleteUser(createdUserId);
        await APIAssertions_1.APIAssertions.assertNoContent(deleteResponse);
        console.log(`Deleted user with ID: ${createdUserId}`);
        try {
            await goRestService.getUserById(createdUserId);
            throw new Error('User should not exist after deletion');
        }
        catch (error) {
            await APIAssertions_1.APIAssertions.assertNotFound(error.response);
        }
    });
});

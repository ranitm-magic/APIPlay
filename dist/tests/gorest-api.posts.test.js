"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const GoRestService_1 = require("../services/GoRestService");
const GoRestPostsService_1 = require("../services/GoRestPostsService");
test_1.test.describe('GoRest API Nested Resource Tests', () => {
    let goRestPostService;
    let goRestService;
    let createdUserId;
    let requestContext;
    test_1.test.beforeAll(async () => {
        requestContext = await test_1.request.newContext();
        goRestService = new GoRestService_1.GoRestService(requestContext);
        goRestPostService = new GoRestPostsService_1.GoRestPostsService(requestContext);
        const randomEmail = `test.user.${Date.now()}@example.com`;
        const newUser = {
            name: 'Post Test User',
            email: randomEmail,
            gender: 'female',
            status: 'active'
        };
        const createdUser = await goRestService.createUser(newUser);
        createdUserId = createdUser.id;
        console.log(`Created user with ID ${createdUserId} for post tests.`);
    });
    (0, test_1.test)('should create a post for a user', async () => {
        const newPost = {
            title: 'My First Post',
            body: 'This is the body of my first post.'
        };
        const createdPost = await goRestPostService.createUserPost(createdUserId, newPost);
        (0, test_1.expect)(createdPost.id).toBeTruthy();
        (0, test_1.expect)(createdPost.user_id).toBe(createdUserId);
        (0, test_1.expect)(createdPost.title).toBe(newPost.title);
        (0, test_1.expect)(createdPost.body).toBe(newPost.body);
        console.log(`Created post with ID ${createdPost.id} for user ${createdUserId}.`);
    });
    (0, test_1.test)('should retrieve all posts for a user', async () => {
        await goRestPostService.createUserPost(createdUserId, { title: 'Post A', body: 'Body A' });
        await goRestPostService.createUserPost(createdUserId, { title: 'Post B', body: 'Body B' });
        const posts = await goRestPostService.getUserPosts(createdUserId);
        (0, test_1.expect)(Array.isArray(posts)).toBe(true);
        (0, test_1.expect)(posts.length).toBeGreaterThanOrEqual(2);
        for (const post of posts) {
            (0, test_1.expect)(post.user_id).toBe(createdUserId);
        }
        console.log(`Retrieved ${posts.length} posts for user ${createdUserId}.`);
    });
    test_1.test.afterAll(async () => {
        if (createdUserId) {
            await goRestService.deleteUser(createdUserId);
            console.log(`Cleaned up: Deleted user with ID ${createdUserId}.`);
        }
        await requestContext.dispose();
    });
});

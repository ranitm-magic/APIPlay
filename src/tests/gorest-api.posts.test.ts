import { test, expect, APIRequestContext, request as apiRequest } from '@playwright/test';
import { GoRestService, GoRestUser } from '../services/GoRestService';
import { GoRestPostsService,UserPosts} from '../services/GoRestPostsService';

test.describe('GoRest API Nested Resource Tests', () => {
 let goRestPostService: GoRestPostsService;

    let goRestService: GoRestService;
    let createdUserId: number;
    let requestContext: APIRequestContext;

    test.beforeAll(async () => {
        requestContext = await apiRequest.newContext();
        goRestService = new GoRestService(requestContext);
        goRestPostService = new GoRestPostsService(requestContext);
        
        const randomEmail = `test.user.${Date.now()}@example.com`;
        const newUser: GoRestUser = {
            name: 'Post Test User',
            email: randomEmail,
            gender: 'female',
            status: 'active'
        };
        const createdUser = await goRestService.createUser(newUser);
        createdUserId = createdUser.id;
        console.log(`Created user with ID ${createdUserId} for post tests.`);
    });

    test('should create a post for a user', async () => {
        const newPost: UserPosts = {
            title: 'My First Post',
            body: 'This is the body of my first post.'
        };

        const createdPost = await goRestPostService.createUserPost(createdUserId, newPost);
        
        expect(createdPost.id).toBeTruthy();
        expect(createdPost.user_id).toBe(createdUserId);
        expect(createdPost.title).toBe(newPost.title);
        expect(createdPost.body).toBe(newPost.body);
        console.log(`Created post with ID ${createdPost.id} for user ${createdUserId}.`);
    });

    test('should retrieve all posts for a user', async () => {
        await goRestPostService.createUserPost(createdUserId, { title: 'Post A', body: 'Body A' });
        await goRestPostService.createUserPost(createdUserId, { title: 'Post B', body: 'Body B' });

        const posts = await goRestPostService.getUserPosts(createdUserId);
        
        expect(Array.isArray(posts)).toBe(true);
        expect(posts.length).toBeGreaterThanOrEqual(2);
        
        for (const post of posts) {
            expect(post.user_id).toBe(createdUserId);
        }
        console.log(`Retrieved ${posts.length} posts for user ${createdUserId}.`);
    });

    test.afterAll(async () => {
        if (createdUserId) {
            await goRestService.deleteUser(createdUserId);
            console.log(`Cleaned up: Deleted user with ID ${createdUserId}.`);
        }
        await requestContext.dispose();
    });
});

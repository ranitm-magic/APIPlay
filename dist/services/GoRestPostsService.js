"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoRestPostsService = void 0;
const APIClient_1 = require("../base/APIClient");
class GoRestPostsService extends APIClient_1.APIClient {
    constructor(request) {
        super(request, 'https://gorest.co.in/public/v2');
    }
    /**
     * Creates a user post
     * POST /public/v2/users/{userId}/posts
     */
    async createUserPost(userId, post) {
        return this.POST(`/users/${userId}/posts`, {
            data: post
        });
    }
    /**
     * Gets user posts
     * GET /public/v2/users/{userId}/posts
     */
    async getUserPosts(userId) {
        return this.GET(`/users/${userId}/posts`);
    }
}
exports.GoRestPostsService = GoRestPostsService;

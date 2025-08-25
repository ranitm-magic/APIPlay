"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = exports.PostsService = void 0;
const APIClient_1 = require("../base/APIClient");
class PostsService extends APIClient_1.APIClient {
    constructor(request, baseUrl) {
        super(request, baseUrl);
    }
    async getAllPosts(options = {}) {
        return this.GET('/posts', options);
    }
    async getPostById(id, options = {}) {
        return this.GET(`/posts/${id}`, options);
    }
    async createPost(post, options = {}) {
        return this.POST('/posts', {
            ...options,
            data: post
        });
    }
    async updatePost(id, post, options = {}) {
        return this.PUT(`/posts/${id}`, {
            ...options,
            data: post
        });
    }
    async deletePost(id, options = {}) {
        return this.DELETE(`/posts/${id}`, options);
    }
    // Additional methods for comments
    async getPostComments(postId, options = {}) {
        return this.GET(`/posts/${postId}/comments`, options);
    }
    async getUserPosts(userId, options = {}) {
        return this.GET(`/users/${userId}/posts`, options);
    }
}
exports.PostsService = PostsService;
// You can create similar service classes for other endpoints
class UsersService extends APIClient_1.APIClient {
    constructor(request) {
        super(request, 'https://jsonplaceholder.typicode.com');
    }
    async getAllUsers(options = {}) {
        return this.GET('/users', options);
    }
    async getUserById(id, options = {}) {
        return this.GET(`/users/${id}`, options);
    }
    async getUserPosts(userId, options = {}) {
        return this.GET(`/users/${userId}/posts`, options);
    }
}
exports.UsersService = UsersService;

import { APIClient, RequestOptions } from '../base/APIClient';
import { APIRequestContext } from '@playwright/test';

export interface Post {
    userId: number;
    id?: number;
    title: string;
    body: string;
}

export class PostsService extends APIClient {
    constructor(request: APIRequestContext, baseUrl: string) {
        super(request, baseUrl);
    }

    async getAllPosts(options: RequestOptions = {}) {
        return this.GET('/posts', options);
    }

    async getPostById(id: number, options: RequestOptions = {}) {
        return this.GET(`/posts/${id}`, options);
    }

    async createPost(post: Post, options: RequestOptions = {}) {
        return this.POST('/posts', {
            ...options,
            data: post
        });
    }

    async updatePost(id: number, post: Post, options: RequestOptions = {}) {
        return this.PUT(`/posts/${id}`, {
            ...options,
            data: post
        });
    }

    async deletePost(id: number, options: RequestOptions = {}) {
        return this.DELETE(`/posts/${id}`, options);
    }

    // Additional methods for comments
    async getPostComments(postId: number, options: RequestOptions = {}) {
        return this.GET(`/posts/${postId}/comments`, options);
    }

    async getUserPosts(userId: number, options: RequestOptions = {}) {
        return this.GET(`/users/${userId}/posts`, options);
    }
}

// You can create similar service classes for other endpoints
export class UsersService extends APIClient {
    constructor(request: APIRequestContext) {
        super(request, 'https://jsonplaceholder.typicode.com');
    }

    async getAllUsers(options: RequestOptions = {}) {
        return this.GET('/users', options);
    }

    async getUserById(id: number, options: RequestOptions = {}) {
        return this.GET(`/users/${id}`, options);
    }

    async getUserPosts(userId: number, options: RequestOptions = {}) {
        return this.GET(`/users/${userId}/posts`, options);
    }
}
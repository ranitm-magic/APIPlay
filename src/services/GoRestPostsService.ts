import { APIClient } from '../base/APIClient';
import { APIRequestContext } from '@playwright/test';

export interface UserPosts {
    id?: number;
    user_id?: number;
    title: string;
    body: string;
}

export class GoRestPostsService extends APIClient {
    constructor(request: APIRequestContext) {   
        super(request, 'https://gorest.co.in/public/v2');
    }

    /**
     * Creates a user post
     * POST /public/v2/users/{userId}/posts
     */
    async createUserPost(userId: number, post: UserPosts): Promise<UserPosts> {
        return this.POST<UserPosts>(`/users/${userId}/posts`, {
            data: post
        });
    }

    /**
     * Gets user posts
     * GET /public/v2/users/{userId}/posts
     */
    async getUserPosts(userId: number): Promise<UserPosts[]> {
        return this.GET<UserPosts[]>(`/users/${userId}/posts`);
    }
}

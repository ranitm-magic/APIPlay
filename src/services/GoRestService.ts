import { APIClient, RequestOptions } from '../base/APIClient';
import { APIRequestContext } from '@playwright/test';

export interface GoRestUser {
    id?: number;
    name: string;
    email: string;
    gender: 'male' | 'female';
    status: 'active' | 'inactive';
}

export interface GoRestResponse extends GoRestUser {
    id: number;
}


export class GoRestService extends APIClient {
    constructor(request: APIRequestContext) {
        super(request, 'https://gorest.co.in/public/v2');
    }

    /**
     * Create a new user
     * POST /public/v2/users
     */
    async createUser(user: GoRestUser): Promise<GoRestResponse> {
        return this.POST<GoRestResponse>('/users', {
            data: user,
        });
    }

    /**
     * Get user details
     * GET /public/v2/users/{id}
     */
    async getUserById(id: number): Promise<GoRestResponse> {
        return this.GET<GoRestResponse>(`/users/${id}`);
    }

    /**
     * Update user details
     * PUT /public/v2/users/{id}
     */
    async updateUser(id: number, user: Partial<GoRestUser>): Promise<GoRestResponse> {
        return this.PUT<GoRestResponse>(`/users/${id}`, {
            data: user
        });
    }

    /**
     * Delete user
     * DELETE /public/v2/users/{id}
     */
    async deleteUser(id: number): Promise<void> {
        return this.DELETE(`/users/${id}`);
    }

    
}
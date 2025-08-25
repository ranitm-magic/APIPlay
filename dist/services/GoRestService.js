"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoRestService = void 0;
const APIClient_1 = require("../base/APIClient");
class GoRestService extends APIClient_1.APIClient {
    constructor(request) {
        super(request, 'https://gorest.co.in/public/v2');
    }
    /**
     * Create a new user
     * POST /public/v2/users
     */
    async createUser(user) {
        return this.POST('/users', {
            data: user
        });
    }
    /**
     * Get user details
     * GET /public/v2/users/{id}
     */
    async getUserById(id) {
        return this.GET(`/users/${id}`);
    }
    /**
     * Update user details
     * PUT /public/v2/users/{id}
     */
    async updateUser(id, user) {
        return this.PUT(`/users/${id}`, {
            data: user
        });
    }
    /**
     * Delete user
     * DELETE /public/v2/users/{id}
     */
    async deleteUser(id) {
        return this.DELETE(`/users/${id}`);
    }
}
exports.GoRestService = GoRestService;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIAssertions = void 0;
const test_1 = require("@playwright/test");
class APIAssertions {
    static async assertSuccessfulResponse(response) {
        (0, test_1.expect)(response.ok()).toBeTruthy();
        (0, test_1.expect)(response.status()).toBeLessThan(400);
    }
    static async assertCreated(response) {
        (0, test_1.expect)(response.status()).toBe(201);
        (0, test_1.expect)(response.statusText()).toBe('Created');
    }
    static async assertOk(response) {
        (0, test_1.expect)(response.status()).toBe(200);
        (0, test_1.expect)(response.statusText()).toBe('OK');
    }
    static async assertNoContent(response) {
        (0, test_1.expect)(response.status()).toBe(204);
        (0, test_1.expect)(response.statusText()).toBe('No Content');
    }
    static async assertNotFound(response) {
        (0, test_1.expect)(response.status()).toBe(404);
        (0, test_1.expect)(response.statusText()).toBe('Not Found');
    }
    static async assertResponseStatus(response, status) {
        (0, test_1.expect)(response.status()).toBe(status);
    }
    static async assertResponseBody(response, expectedData) {
        const responseData = await response.json();
        Object.entries(expectedData).forEach(([key, value]) => {
            (0, test_1.expect)(responseData[key]).toBe(value);
        });
    }
    static async assertArrayResponse(response) {
        const data = await response.json();
        (0, test_1.expect)(Array.isArray(data)).toBeTruthy();
        (0, test_1.expect)(data.length).toBeGreaterThan(0);
    }
    static async assertEmptyResponse(response) {
        const data = await response.json();
        (0, test_1.expect)(Object.keys(data).length).toBe(0);
    }
}
exports.APIAssertions = APIAssertions;

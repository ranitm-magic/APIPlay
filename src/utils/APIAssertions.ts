import { APIResponse, expect } from '@playwright/test';

export class APIAssertions {
    static async assertSuccessfulResponse(response: APIResponse) {
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBeLessThan(400);
    }

    static async assertResponseStatus(response: APIResponse, status: number) {
        expect(response.status()).toBe(status);
    }

    static async assertResponseBody<T>(response: APIResponse, expectedData: Partial<T>) {
        const responseData = await response.json();
        Object.entries(expectedData).forEach(([key, value]) => {
            expect(responseData[key]).toBe(value);
        });
    }

    static async assertArrayResponse(response: APIResponse) {
        const data = await response.json();
        expect(Array.isArray(data)).toBeTruthy();
        expect(data.length).toBeGreaterThan(0);
    }

    static async assertEmptyResponse(response: APIResponse) {
        const data = await response.json();
        expect(Object.keys(data).length).toBe(0);
    }
}
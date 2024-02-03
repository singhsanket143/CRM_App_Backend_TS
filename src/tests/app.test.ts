import app from '../app';
import supertest from 'supertest';

const request = supertest(app);

describe("sample test endpoint", () => {
    
    test("should return response on ping", async () => {
        const response = await request.get("/ping");
        expect(response.status).toBe(200);
    })
});
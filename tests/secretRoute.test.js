const request = require("supertest");
const express = require("express");
const { router, secretMap } = require("../routes/secret");
const app = express();
app.use(express.json());
app.use("/", router);

describe("POST /", () => {
  test("should respond with status code 201 and a secret key when a valid request is made", async () => {
    const message = "Test message";
    const response = await request(app).post("/").send({ message });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("secretKey");
  });

  test("should store the secret key and message in the secretMap when a valid request is made", async () => {
    const message = "Test message";
    const response = await request(app).post("/").send({ message });
    const secretKey = response.body.secretKey;
    expect(secretMap.has(secretKey)).toBe(true);
    expect(secretMap.get(secretKey)).toBe(message);
  });
});

describe("GET /:secretKey", () => {
  test("should respond with status code 404 and an error message when an invalid secret key is provided", async () => {
    const response = await request(app).get("/invalid_secret_key");
    expect(response.status).toBe(404);
    expect(response.body.error).toBeDefined();
  });

  test("should remove the secret key from the secretMap after it has been viewed", async () => {
    const secretKey = "valid_secret_key";
    const secretMessage = "Test message";
    secretMap.set(secretKey, secretMessage);
    await request(app).get(`/${secretKey}`);
    expect(secretMap.has(secretKey)).toBe(false);
  });
});

describe("POST / and GET /:secretKey", () => {
  test("should respond with status code 200 and the correct secret message when a valid secret key is provided", async () => {
    const message = "Test message";
    const resPOST = await request(app).post("/").send({ message });
    const response = await request(app).get(`/${resPOST.body.secretKey}`);
    expect(response.status).toBe(200);
    expect(response.body.secretMessage).toBe(message);
    expect(secretMap.has(response.body.secretKey)).toBe(false);
  });

  test("should respond with status code 404 and an error message when a secret key that has already been viewed is provided", async () => {
    const message = "Test message";
    const resPOST = await request(app).post("/").send({ message });
    await request(app).get(`/${resPOST.body.secretKey}`);
    const response = await request(app).get(`/${resPOST.body.secretKey}`);
    expect(response.status).toBe(404);
    expect(response.body.error).toBeDefined();
  });
});

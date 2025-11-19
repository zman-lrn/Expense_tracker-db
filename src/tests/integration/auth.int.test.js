const request = require("supertest");
const app = require("../../../app");

describe("Auth Routes", () => {
  let token;

  it("POST /api/auth/register → register user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    });
    expect(res.statusCode).toBe(201);
  });

  it("POST /api/auth/login → login user", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "password123",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    token = res.body.token;
  });

  it("GET /api/auth/profile → should return user profile", async () => {
    const res = await request(app)
      .get("/api/auth/profile")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("email", "test@example.com");
  });
});

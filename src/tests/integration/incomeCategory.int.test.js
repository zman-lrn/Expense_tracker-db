const request = require("supertest");
const app = require("../../../app");
const jwt = require("jsonwebtoken");
const token = jwt.sign({ userId: 1 }, process.env.JWT_SECRET || "secret");

describe("Income Category Routes", () => {
  let categoryId;

  it("POST /api/income-categories → create category", async () => {
    const res = await request(app)
      .post("/api/income-categories")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Test Income Cat" });
    expect(res.statusCode).toBe(201);
    categoryId = res.body.id;
  });

  it("GET /api/income-categories → list categories", async () => {
    const res = await request(app)
      .get("/api/income-categories")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("PUT /api/income-categories/:id → update category", async () => {
    const res = await request(app)
      .put(`/api/income-categories/${categoryId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Updated Income Cat" });
    expect(res.statusCode).toBe(200);
  });

  it("DELETE /api/income-categories/:id → delete category", async () => {
    const res = await request(app)
      .delete(`/api/income-categories/${categoryId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});

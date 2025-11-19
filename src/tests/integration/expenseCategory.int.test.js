const request = require("supertest");
const app = require("../../../app");
const jwt = require("jsonwebtoken");
const token = jwt.sign({ userId: 1 }, process.env.JWT_SECRET || "secret");

describe("Expense Category Routes", () => {
  let categoryId;

  it("POST /api/expense-categories → create category", async () => {
    const res = await request(app)
      .post("/api/expense-categories")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Test Expense Cat" });
    expect(res.statusCode).toBe(201);
    categoryId = res.body.id;
  });

  it("GET /api/expense-categories → list categories", async () => {
    const res = await request(app)
      .get("/api/expense-categories")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("PUT /api/expense-categories/:id → update category", async () => {
    const res = await request(app)
      .put(`/api/expense-categories/${categoryId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Updated Expense Cat" });
    expect(res.statusCode).toBe(200);
  });

  it("DELETE /api/expense-categories/:id → delete category", async () => {
    const res = await request(app)
      .delete(`/api/expense-categories/${categoryId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});

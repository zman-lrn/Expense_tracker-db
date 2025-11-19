const request = require("supertest");
const app = require("../../../app");
const jwt = require("jsonwebtoken");
const token = jwt.sign({ userId: 1 }, process.env.JWT_SECRET || "secret");

describe("Expense Routes", () => {
  let expenseId;

  it("POST /api/expenses → create expense", async () => {
    const res = await request(app)
      .post("/api/expenses")
      .set("Authorization", `Bearer ${token}`)
      .send({
        expense_category_id: 1,
        amount: 50,
        note: "Test Expense",
        date: new Date().toISOString(),
      });
    expect(res.statusCode).toBe(201);
    expenseId = res.body.id;
  });

  it("GET /api/expenses → list expenses", async () => {
    const res = await request(app)
      .get("/api/expenses")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("PUT /api/expenses/:id → update expense", async () => {
    const res = await request(app)
      .put(`/api/expenses/${expenseId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ amount: 75 });
    expect(res.statusCode).toBe(200);
  });

  it("DELETE /api/expenses/:id → delete expense", async () => {
    const res = await request(app)
      .delete(`/api/expenses/${expenseId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});

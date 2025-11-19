const request = require("supertest");
const app = require("../../../app");
const jwt = require("jsonwebtoken");
const token = jwt.sign({ userId: 1 }, process.env.JWT_SECRET || "secret");

describe("Income Routes", () => {
  let incomeId;

  it("POST /api/income → create income", async () => {
    const res = await request(app)
      .post("/api/income")
      .set("Authorization", `Bearer ${token}`)
      .send({
        income_category_id: 1,
        amount: 100,
        note: "Test Income",
        date: new Date().toISOString(),
      });
    expect(res.statusCode).toBe(201);
    incomeId = res.body.id;
  });

  it("GET /api/income → list incomes", async () => {
    const res = await request(app)
      .get("/api/income")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("PUT /api/income/:id → update income", async () => {
    const res = await request(app)
      .put(`/api/income/${incomeId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ amount: 200 });
    expect(res.statusCode).toBe(200);
  });

  it("DELETE /api/income/:id → delete income", async () => {
    const res = await request(app)
      .delete(`/api/income/${incomeId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});

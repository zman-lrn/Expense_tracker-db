const request = require("supertest");
const app = require("../../../app");
const jwt = require("jsonwebtoken");
const token = jwt.sign({ userId: 1 }, process.env.JWT_SECRET || "secret");

describe("Balance Route", () => {
  it("GET /api/balance → should return balance object", async () => {
    const res = await request(app)
      .get("/api/balance")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("totalIncome");
    expect(res.body).toHaveProperty("totalExpense");
    expect(res.body).toHaveProperty("balance");
  });
});

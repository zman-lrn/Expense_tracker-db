const incomeCategoryService = require("../../services/incomeCategory.service");
const knex = require("../../../db/knex");

jest.mock("../../../db/knex");

describe("Income Category Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a category", async () => {
    knex.mockResolvedValue([{ id: 1, name: "Test" }]);
    const result = await incomeCategoryService.addCategory({ name: "Test" });
    expect(result).toHaveProperty("id", 1);
  });

  it("should list categories", async () => {
    knex.mockResolvedValue([{ id: 1, name: "Test" }]);
    const categories = await incomeCategoryService.getAllCategories();
    expect(categories.length).toBeGreaterThan(0);
  });
});

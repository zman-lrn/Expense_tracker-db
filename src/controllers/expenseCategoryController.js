const db = require("../../db/db");

async function getExpenseCategories(req, res) {
  try {
    const categories = await db("expense_categories")
      .where("user_id", req.user.id)
      .orWhereNull("user_id")
      .orderBy("name", "asc");

    res.json({ categories });
  } catch (err) {
    console.error("Get Expense Categories Error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

async function addExpenseCategory(req, res) {
  try {
    const { name } = req.body;
    const [category] = await db("expense_categories")
      .insert({ name, user_id: req.user.id })
      .returning("*");
    res.status(201).json({ category });
  } catch (err) {
    console.error("Add Expense Category Error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

async function updateExpenseCategory(req, res) {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const [category] = await db("expense_categories")
      .where({ id, user_id: req.user.id })
      .update({ name })
      .returning("*");

    if (!category)
      return res
        .status(404)
        .json({ message: "Category not found or not allowed" });

    res.json({ category });
  } catch (err) {
    console.error("Update Expense Category Error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

async function deleteExpenseCategory(req, res) {
  try {
    const { id } = req.params;

    const deleted = await db("expense_categories")
      .where({ id, user_id: req.user.id })
      .del();

    if (!deleted)
      return res
        .status(404)
        .json({ message: "Category not found or not allowed" });

    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    console.error("Delete Expense Category Error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  getExpenseCategories,
  addExpenseCategory,
  updateExpenseCategory,
  deleteExpenseCategory,
};

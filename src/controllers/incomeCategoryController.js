const db = require("../../db/db");

async function getIncomeCategories(req, res) {
  try {
    const categories = await db("income_categories")
      .where(function () {
        this.where({ user_id: req.user.id }).orWhereNull("user_id");
      })
      .orderBy("name");

    res.json({ categories });
  } catch (err) {
    console.error("Get Income Categories Error:", err);
    res.status(500).json({ message: err.message });
  }
}

async function addIncomeCategory(req, res) {
  try {
    const { name } = req.body;
    const [category] = await db("income_categories")
      .insert({ name, user_id: req.user.id })
      .returning("*");

    res.status(201).json({ category });
  } catch (err) {
    console.error("Add Income Category Error:", err);
    res.status(500).json({ message: err.message });
  }
}
async function updateIncomeCategory(req, res) {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const [category] = await db("income_categories")
      .where({ id, user_id: req.user.id })
      .update({ name })
      .returning("*");

    if (!category) {
      return res
        .status(404)
        .json({ message: "Category not found or not allowed to update" });
    }

    res.json({ category });
  } catch (err) {
    console.error("Update Income Category Error:", err);
    res.status(500).json({ message: err.message });
  }
}

async function deleteIncomeCategory(req, res) {
  try {
    const { id } = req.params;

    const deleted = await db("income_categories")
      .where({ id, user_id: req.user.id })
      .del();

    if (!deleted) {
      return res
        .status(404)
        .json({ message: "Category not found or not allowed to delete" });
    }

    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    console.error("Delete Income Category Error:", err);
    res.status(500).json({ message: err.message });
  }
}
module.exports = {
  getIncomeCategories,
  addIncomeCategory,
  updateIncomeCategory,
  deleteIncomeCategory,
};

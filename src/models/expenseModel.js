const db = require("../../db/db");

async function addExpense(expense) {
  return db("expenses").insert(expense).returning("*");
}

async function getUserExpenses(user_id) {
  return db("expenses").where({ user_id });
}

module.exports = { addExpense, getUserExpenses };

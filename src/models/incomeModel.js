const db = require("../../db/db");

async function addIncome(income) {
  return db("income").insert(income).returning("*");
}

async function getUserIncome(user_id) {
  return db("income").where({ user_id });
}

module.exports = { addIncome, getUserIncome };

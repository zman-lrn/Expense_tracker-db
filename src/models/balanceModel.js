const db = require("../../db/db");

async function getBalance(user_id) {
  return db("balance").where({ user_id }).first();
}

async function createOrUpdateBalance(
  user_id,
  incomeAmount = 0,
  expenseAmount = 0
) {
  const balance = await getBalance(user_id);
  if (balance) {
    return db("balance")
      .where({ user_id })
      .update({
        total_income: balance.total_income + incomeAmount,
        total_expense: balance.total_expense + expenseAmount,
        balance: balance.balance + incomeAmount - expenseAmount,
        updated_at: new Date(),
      });
  } else {
    return db("balance").insert({
      user_id,
      total_income: incomeAmount,
      total_expense: expenseAmount,
      balance: incomeAmount - expenseAmount,
      updated_at: new Date(),
    });
  }
}

module.exports = { getBalance, createOrUpdateBalance };

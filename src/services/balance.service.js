const knex = require("../../db/db");
const { del } = require("../utils/cache");

async function getBalance(user_id) {
  return knex("balance").where({ user_id }).first();
}

async function addIncomeToBalance(user_id, amount, trx) {
  trx = trx || knex;
  console.log(user_id);

  let balance = await trx("balance").where({ user_id }).first();
  if (!balance) {
    balance = await trx("balance")
      .insert({
        user_id,
        total_income: 0,
        total_expense: 0,
        balance: 0,
        updated_at: trx.fn.now(),
      })
      .returning("*")
      .then((rows) => rows[0]);
  }

  await trx("balance")
    .where({ user_id })
    .increment("total_income", amount)
    .increment("balance", amount)
    .update({ updated_at: trx.fn.now() });

  await del(`dashboard:${user_id}`);
}

async function subtractIncomeFromBalance(user_id, amount, trx) {
  trx = trx || knex;
  await trx("balance")
    .where({ user_id })
    .decrement("total_income", amount)
    .increment("balance", -amount)
    .update({ updated_at: trx.fn.now() });
  await del(`dashboard:${user_id}`);
}

async function addExpenseToBalance(user_id, amount, trx) {
  trx = trx || knex;

  let balance = await trx("balance").where({ user_id }).first();
  if (!balance) {
    balance = await trx("balance")
      .insert({
        user_id,
        total_income: 0,
        total_expense: 0,
        balance: 0,
        updated_at: trx.fn.now(),
      })
      .returning("*")
      .then((rows) => rows[0]);
  }

  await trx("balance")
    .where({ user_id })
    .increment("total_expense", amount)
    .decrement("balance", amount)
    .update({ updated_at: trx.fn.now() });

  await del(`dashboard:${user_id}`);
}

async function subtractExpenseFromBalance(user_id, amount, trx) {
  trx = trx || knex;
  await trx("balance")
    .where({ user_id })
    .decrement("total_expense", amount)
    .increment("balance", amount)
    .update({ updated_at: trx.fn.now() });
  await del(`dashboard:${user_id}`);
}

module.exports = {
  getBalance,
  addIncomeToBalance,
  subtractIncomeFromBalance,
  addExpenseToBalance,
  subtractExpenseFromBalance,
};

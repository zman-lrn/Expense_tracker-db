const {
  getBalance: getBalanceService,
} = require("../services/balance.service");

async function getBalance(req, res) {
  try {
    const userId = req.user.id;

    let balance = await getBalanceService(userId);

    if (!balance) {
      const knex = require("../../db/db");
      const [newBalance] = await knex("balance")
        .insert({
          user_id: userId,
          total_income: 0,
          total_expense: 0,
          balance: 0,
          updated_at: knex.fn.now(),
        })
        .returning("*");
      balance = newBalance;
    }

    res.json({
      total_income: parseFloat(balance.total_income),
      total_expense: parseFloat(balance.total_expense),
      balance: parseFloat(balance.balance),
    });
  } catch (err) {
    console.error("Fetch Balance Error:", err);
    res.status(500).json({ message: "Failed to fetch balance" });
  }
}

module.exports = { getBalance };

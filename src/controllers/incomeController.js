const db = require("../../db/db");

async function ensureBalance(userId) {
  let balance = await db("balance").where({ user_id: userId }).first();
  if (!balance) {
    const [newBalance] = await db("balance")
      .insert({
        user_id: userId,
        total_income: 0,
        total_expense: 0,
        balance: 0,
        updated_at: db.fn.now(),
      })
      .returning("*");
    balance = newBalance;
  }
  return balance;
}

async function getIncome(req, res) {
  try {
    const incomes = await db("income")
      .join(
        "income_categories",
        "income.income_category_id",
        "income_categories.id"
      )
      .select(
        "income.id",
        "income.user_id",
        "income.amount",
        "income.note",
        "income.date",
        "income.created_at",
        "income_categories.name as category_name"
      )
      .where("income.user_id", req.user.id)
      .orderBy("income.date", "desc");
    res.json(incomes);
  } catch (err) {
    console.error("Fetch Income Error:", err);
    res.status(500).json({ message: "Failed to fetch incomes" });
  }
}

async function addIncome(req, res) {
  try {
    const userId = req.user.id;
    const { income_category_id, amount, note, date } = req.body;

    if (!income_category_id || !amount || !date)
      return res.status(400).json({ message: "Missing required fields" });

    const [income] = await db("income")
      .insert({
        user_id: userId,
        income_category_id,
        amount,
        note,
        date,
      })
      .returning("*");

    let balance = await db("balance").where({ user_id: userId }).first();

    if (!balance) {
      balance = await db("balance")
        .insert({
          user_id: userId,
          total_income: 0,
          total_expense: 0,
          balance: 0,
          updated_at: db.fn.now(),
        })
        .returning("*")
        .then((rows) => rows[0]);
    }

    await db("balance")
      .where({ user_id: userId })
      .update({
        total_income: parseFloat(balance.total_income) + parseFloat(amount),
        balance:
          parseFloat(balance.total_income) +
          parseFloat(amount) -
          parseFloat(balance.total_expense),
        updated_at: db.fn.now(),
      });

    res.status(201).json(income);
  } catch (err) {
    console.error("Add Income Error:", err);
    res.status(500).json({ message: "Failed to add income" });
  }
}

async function updateIncome(req, res) {
  try {
    const userId = req.user.id;
    const incomeId = req.params.id;
    const { income_category_id, amount, note, date } = req.body;

    const income = await db("income")
      .where({ id: incomeId, user_id: userId })
      .first();
    if (!income) return res.status(404).json({ message: "Income not found" });

    const updatedIncome = await db("income")
      .where({ id: incomeId })
      .update({
        income_category_id: income_category_id || income.income_category_id,
        amount: amount !== undefined ? amount : income.amount,
        note: note !== undefined ? note : income.note,
        date: date || income.date,
      })
      .returning("*");

    if (amount !== undefined) {
      const balance = await ensureBalance(userId);
      const diff = parseFloat(amount) - parseFloat(income.amount);
      await db("balance")
        .where({ user_id: userId })
        .update({
          total_income: parseFloat(balance.total_income) + diff,
          balance:
            parseFloat(balance.total_income) +
            diff -
            parseFloat(balance.total_expense),
          updated_at: db.fn.now(),
        });
    }

    res.json(updatedIncome[0]);
  } catch (err) {
    console.error("Update Income Error:", err);
    res.status(500).json({ message: "Failed to update income" });
  }
}

async function deleteIncome(req, res) {
  try {
    const userId = req.user.id;
    const incomeId = req.params.id;

    const income = await db("income")
      .where({ id: incomeId, user_id: userId })
      .first();
    if (!income) return res.status(404).json({ message: "Income not found" });

    await db("income").where({ id: incomeId }).del();

    const balance = await ensureBalance(userId);
    await db("balance")
      .where({ user_id: userId })
      .update({
        total_income:
          parseFloat(balance.total_income) - parseFloat(income.amount),
        balance:
          parseFloat(balance.total_income) -
          parseFloat(income.amount) -
          parseFloat(balance.total_expense),
        updated_at: db.fn.now(),
      });

    res.json({ message: "Income deleted successfully" });
  } catch (err) {
    console.error("Delete Income Error:", err);
    res.status(500).json({ message: "Failed to delete income" });
  }
}

module.exports = { getIncome, addIncome, updateIncome, deleteIncome };

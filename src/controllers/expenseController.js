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

async function getExpenses(req, res) {
  try {
    const expenses = await db("expenses")
      .join(
        "expense_categories",
        "expenses.expense_category_id",
        "expense_categories.id"
      )
      .select(
        "expenses.id",
        "expenses.user_id",
        "expenses.amount",
        "expenses.note",
        "expenses.date",
        "expenses.created_at",
        "expense_categories.name as category_name"
      )
      .where("expenses.user_id", req.user.id)
      .orderBy("expenses.date", "desc");

    res.json(expenses);
  } catch (err) {
    console.error("Fetch Expenses Error:", err);
    res.status(500).json({ message: "Failed to fetch expenses" });
  }
}

async function addExpense(req, res) {
  try {
    const userId = req.user.id;
    const { expense_category_id, amount, note, date } = req.body;

    if (!expense_category_id || !amount || !date)
      return res.status(400).json({ message: "Missing required fields" });

    const [expense] = await db("expenses")
      .insert({
        user_id: userId,
        expense_category_id,
        amount,
        note,
        date,
      })
      .returning("*");

    const balance = await ensureBalance(userId);
    await db("balance")
      .where({ user_id: userId })
      .update({
        total_expense: parseFloat(balance.total_expense) + parseFloat(amount),
        balance:
          parseFloat(balance.total_income) -
          (parseFloat(balance.total_expense) + parseFloat(amount)),
        updated_at: db.fn.now(),
      });

    res.status(201).json(expense);
  } catch (err) {
    console.error("Add Expense Error:", err);
    res.status(500).json({ message: "Failed to add expense" });
  }
}

async function updateExpense(req, res) {
  try {
    const userId = req.user.id;
    const expenseId = req.params.id;
    const { expense_category_id, amount, note, date } = req.body;

    const expense = await db("expenses")
      .where({ id: expenseId, user_id: userId })
      .first();
    if (!expense) return res.status(404).json({ message: "Expense not found" });

    const updatedExpense = await db("expenses")
      .where({ id: expenseId })
      .update({
        expense_category_id: expense_category_id || expense.expense_category_id,
        amount: amount !== undefined ? amount : expense.amount,
        note: note !== undefined ? note : expense.note,
        date: date || expense.date,
      })
      .returning("*");

    if (amount !== undefined) {
      const balance = await ensureBalance(userId);
      const diff = parseFloat(amount) - parseFloat(expense.amount);
      await db("balance")
        .where({ user_id: userId })
        .update({
          total_expense: parseFloat(balance.total_expense) + diff,
          balance:
            parseFloat(balance.total_income) -
            (parseFloat(balance.total_expense) + diff),
          updated_at: db.fn.now(),
        });
    }

    res.json(updatedExpense[0]);
  } catch (err) {
    console.error("Update Expense Error:", err);
    res.status(500).json({ message: "Failed to update expense" });
  }
}

async function deleteExpense(req, res) {
  try {
    const userId = req.user.id;
    const expenseId = req.params.id;

    const expense = await db("expenses")
      .where({ id: expenseId, user_id: userId })
      .first();
    if (!expense) return res.status(404).json({ message: "Expense not found" });

    await db("expenses").where({ id: expenseId }).del();

    const balance = await ensureBalance(userId);
    await db("balance")
      .where({ user_id: userId })
      .update({
        total_expense:
          parseFloat(balance.total_expense) - parseFloat(expense.amount),
        balance:
          parseFloat(balance.total_income) -
          (parseFloat(balance.total_expense) - parseFloat(expense.amount)),
        updated_at: db.fn.now(),
      });

    res.json({ message: "Expense deleted successfully" });
  } catch (err) {
    console.error("Delete Expense Error:", err);
    res.status(500).json({ message: "Failed to delete expense" });
  }
}

module.exports = {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
};

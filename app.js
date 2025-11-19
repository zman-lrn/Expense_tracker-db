require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./src/routes/authRoutes");
const incomeRoutes = require("./src/routes/incomeRoutes");
const incomeCategoryRoutes = require("./src/routes/incomeCategoryRoutes");
const expenseRoutes = require("./src/routes/expenseRoutes");
const expenseCategoryRoutes = require("./src/routes/expenseCategoryRoutes");
const balanceRoutes = require("./src/routes/balanceRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/income-categories", incomeCategoryRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/expense-categories", expenseCategoryRoutes);
app.use("/api/balance", balanceRoutes);

app.get("/", (req, res) => {
  res.send("Expense Tracker API is running");
});

module.exports = app;

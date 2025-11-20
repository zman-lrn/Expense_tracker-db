// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const authRoutes = require("./src/routes/authRoutes");
// const incomeRoutes = require("./src/routes/incomeRoutes");
// const expenseRoutes = require("./src/routes/expenseRoutes");
// const balanceRoutes = require("./src/routes/balanceRoutes");
// const incomeCategoryRoutes = require("./src/routes/incomeCategoryRoutes");
// const expenseCategoryRoutes = require("./src/routes/expenseCategoryRoutes");
// const auth = require("./src/middlewares/auth.middleware");

// const setupSwagger = require("./swagger.js");

// const app = express();
// setupSwagger(app);
// app.use(express.json());

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );

// app.use("/api/auth", authRoutes);
// app.use("/api/income-categories", auth, incomeCategoryRoutes);
// app.use("/api/expense-categories", auth, expenseCategoryRoutes);
// app.use("/api/income", auth, incomeRoutes);
// app.use("/api/expenses", auth, expenseRoutes);
// app.use("/api/balance", auth, balanceRoutes);

// // const PORT = process.env.PORT || 4000;
// const PORT = process.env.PORT || 2225;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
//   console.log(`Swagger -> http://localhost:${PORT}/api-docs`);
// });
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./src/routes/authRoutes");
const incomeRoutes = require("./src/routes/incomeRoutes");
const expenseRoutes = require("./src/routes/expenseRoutes");
const balanceRoutes = require("./src/routes/balanceRoutes");
const incomeCategoryRoutes = require("./src/routes/incomeCategoryRoutes");
const expenseCategoryRoutes = require("./src/routes/expenseCategoryRoutes");
const auth = require("./src/middlewares/auth.middleware");
const setup = require("./setup");
const setupSwagger = require("./swagger.js");

const app = express();
setupSwagger(app);

app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/income-categories", auth, incomeCategoryRoutes);
app.use("/api/expense-categories", auth, expenseCategoryRoutes);
app.use("/api/income", auth, incomeRoutes);
app.use("/api/expenses", auth, expenseRoutes);
app.use("/api/balance", auth, balanceRoutes);
setup();

const PORT = process.env.PORT || 2225;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  if (process.env.NODE_ENV !== "production") {
    console.log(`Swagger -> http://localhost:${PORT}/api-docs`);
  }
});

const express = require("express");
const auth = require("../middlewares/auth.middleware");
const {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
} = require("../controllers/expenseController");

const router = express.Router();

router.get("/", auth, getExpenses);
router.post("/", auth, addExpense);
router.put("/:id", auth, updateExpense);
router.delete("/:id", auth, deleteExpense);
/**
 * @swagger
 * tags:
 *   name: Expenses
 *   description: Manage expenses
 */

/**
 * @swagger
 * /api/expenses:
 *   get:
 *     summary: Get all expenses
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of expenses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   expense_category_id:
 *                     type: integer
 *                     example: 2
 *                   amount:
 *                     type: number
 *                     example: 150.5
 *                   note:
 *                     type: string
 *                     example: Grocery shopping
 *                   date:
 *                     type: string
 *                     example: 2025-11-19 12:00:00
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/expenses:
 *   post:
 *     summary: Add a new expense
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Expense info
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - expense_category_id
 *               - amount
 *               - date
 *             properties:
 *               expense_category_id:
 *                 type: integer
 *                 example: 2
 *               amount:
 *                 type: number
 *                 example: 200.75
 *               note:
 *                 type: string
 *                 example: Monthly subscription
 *               date:
 *                 type: string
 *                 example: 2025-11-19
 *     responses:
 *       201:
 *         description: Expense added successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/expenses/{id}:
 *   put:
 *     summary: Update an expense
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Expense ID
 *     requestBody:
 *       description: Updated expense data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               expense_category_id:
 *                 type: integer
 *                 example: 2
 *               amount:
 *                 type: number
 *                 example: 180
 *               note:
 *                 type: string
 *                 example: Updated note
 *               date:
 *                 type: string
 *                 example: 2025-11-19
 *     responses:
 *       200:
 *         description: Expense updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Expense not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/expenses/{id}:
 *   delete:
 *     summary: Delete an expense
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Expense ID
 *     responses:
 *       200:
 *         description: Expense deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Expense not found
 *       500:
 *         description: Internal server error
 */

module.exports = router;

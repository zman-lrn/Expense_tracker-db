const express = require("express");
const {
  getExpenseCategories,
  addExpenseCategory,
  updateExpenseCategory,
  deleteExpenseCategory,
} = require("../controllers/expenseCategoryController");

const auth = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", auth, getExpenseCategories);
router.post("/", auth, addExpenseCategory);
router.put("/:id", auth, updateExpenseCategory);
router.delete("/:id", auth, deleteExpenseCategory);
/**
 * @swagger
 * tags:
 *   name: Expense Categories
 *   description: Manage expense categories
 */

/**
 * @swagger
 * /api/expense-categories:
 *   get:
 *     summary: Get all expense categories
 *     tags: [Expense Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of expense categories
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
 *                   name:
 *                     type: string
 *                     example: Groceries
 *       401:
 *         description: Unauthorized – token missing or invalid
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/expense-categories:
 *   post:
 *     summary: Add a new expense category
 *     tags: [Expense Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Category info
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Utilities
 *     responses:
 *       201:
 *         description: Category added successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/expense-categories/{id}:
 *   put:
 *     summary: Update an expense category
 *     tags: [Expense Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Category ID
 *     requestBody:
 *       description: Updated category data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Rent
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/expense-categories/{id}:
 *   delete:
 *     summary: Delete an expense category
 *     tags: [Expense Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */

module.exports = router;

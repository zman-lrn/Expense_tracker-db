const express = require("express");
const auth = require("../middlewares/auth.middleware");
const {
  getIncome,
  addIncome,
  updateIncome,
  deleteIncome,
} = require("../controllers/incomeController");

const router = express.Router();

router.get("/", auth, getIncome);
router.post("/", auth, addIncome);
router.put("/:id", auth, updateIncome);
router.delete("/:id", auth, deleteIncome);

/**
 * @swagger
 * tags:
 *   name: Income
 *   description: Manage incomes
 */

/**
 * @swagger
 * /api/income:
 *   get:
 *     summary: Get all incomes
 *     tags: [Income]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of incomes
 */
/**
 * @swagger
 * /api/income:
 *   post:
 *     summary: Add a new income
 *     tags: [Income]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Income details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - income_category_id
 *               - amount
 *               - date
 *             properties:
 *               income_category_id:
 *                 type: integer
 *               amount:
 *                 type: number
 *               note:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Income added
 */
/**
 * @swagger
 * /api/income/{id}:
 *   put:
 *     summary: Update an income
 *     tags: [Income]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Income ID
 *     requestBody:
 *       description: Updated income data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               income_category_id:
 *                 type: integer
 *               amount:
 *                 type: number
 *               note:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Income updated
 */
/**
 * @swagger
 * /api/income/{id}:
 *   delete:
 *     summary: Delete an income
 *     tags: [Income]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Income ID
 *     responses:
 *       200:
 *         description: Income deleted
 */
module.exports = router;

const express = require("express");
const {
  addIncomeCategory,
  getIncomeCategories,
  updateIncomeCategory,
  deleteIncomeCategory,
} = require("../controllers/incomeCategoryController");
const auth = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/", auth, addIncomeCategory);
router.get("/", auth, getIncomeCategories);
router.put("/:id", auth, updateIncomeCategory);
router.delete("/:id", auth, deleteIncomeCategory);
/**
 * @swagger
 * tags:
 *   name: Income Categories
 *   description: Manage income categories
 */
/**
 * @swagger
 * /api/income-categories:
 *   get:
 *     summary: Get all income categories
 *     tags: [Income Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of income categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 */

/**
 * @swagger
 * /api/income-categories:
 *   post:
 *     summary: Add new income category
 *     tags: [Income Categories]
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
 *     responses:
 *       201:
 *         description: Category added
 */
/**
 * @swagger
 * /api/income-categories/{id}:
 *   put:
 *     summary: Update income category
 *     tags: [Income Categories]
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
 *     responses:
 *       200:
 *         description: Category updated
 */
/**
 * @swagger
 * /api/income-categories/{id}:
 *   delete:
 *     summary: Delete income category
 *     tags: [Income Categories]
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
 *         description: Category deleted
 */
module.exports = router;

const express = require("express");
const { getBalance } = require("../controllers/balanceController");
const auth = require("../middlewares/auth.middleware");
const router = express.Router();

router.get("/", auth, getBalance);
/**
 * @swagger
 * tags:
 *   name: Balance
 *   description: Retrieve user balance
 */

/**
 * @swagger
 * /api/balance:
 *   get:
 *     summary: Get current user balance
 *     tags: [Balance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns the current balance of the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalIncome:
 *                   type: number
 *                   example: 5000
 *                 totalExpenses:
 *                   type: number
 *                   example: 3000
 *                 balance:
 *                   type: number
 *                   example: 2000
 *       401:
 *         description: Unauthorized – token missing or invalid
 *       500:
 *         description: Internal server error
 */

module.exports = router;

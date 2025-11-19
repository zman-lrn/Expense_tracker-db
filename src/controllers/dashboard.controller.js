const knex = require("../../db/knex");
const { get, set } = require("../utils/cache");

async function getDashboard(req, res, next) {
  try {
    const user_id = req.user.id;
    const cacheKey = `dashboard:${user_id}`;
    const cached = await get(cacheKey);
    if (cached) return res.json(cached);

    const balance = await knex("balance").where({ user_id }).first();

    const payload = {
      total_income: balance?.total_income || 0,
      total_expense: balance?.total_expense || 0,
      balance: balance?.balance || 0,
    };

    await set(cacheKey, payload, 60);
    res.json(payload);
  } catch (err) {
    next(err);
  }
}

module.exports = { getDashboard };

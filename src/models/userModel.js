const db = require("../../db/db");

async function createUser(user) {
  return db("users").insert(user).returning("*");
}

async function findUserByEmail(email) {
  return db("users").where({ email }).first();
}

module.exports = { createUser, findUserByEmail };

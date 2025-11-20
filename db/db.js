// const knex = require("knex");
// require("dotenv").config();

// const db = knex({
//   client: "pg",
//   connection: process.env.DATABASE_URL,
// });

// module.exports = db;

const knex = require("knex");
const knexfile = require("../knexfile"); // <- adjust this path
require("dotenv").config();

const environment = process.env.NODE_ENV || "development";

const db = knex(knexfile[environment]);

module.exports = db;

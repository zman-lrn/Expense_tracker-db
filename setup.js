require("dotenv").config();
const { Client } = require("pg");
const { spawn } = require("child_process");
const path = require("path");

const DB_NAME = "expense_tracker_db";
const DB_USER = process.env.DB_USER || "postgres";
const DB_PASSWORD = process.env.DB_PASSWORD || "1234";
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT || 5432;

const client = new Client({
  user: DB_USER,
  host: DB_HOST,
  database: "postgres",
  password: DB_PASSWORD,
  port: DB_PORT,
});

async function setup() {
  try {
    await client.connect();

    const res = await client.query(
      `SELECT 1 FROM pg_database WHERE datname='${DB_NAME}'`
    );

    if (res.rowCount === 0) {
      console.log(`Database ${DB_NAME} does not exist. Creating...`);
      await client.query(`CREATE DATABASE ${DB_NAME}`);
      console.log(`Database ${DB_NAME} created successfully.`);
    } else {
      console.log(`Database ${DB_NAME} already exists.`);
    }

    await client.end();

    console.log("Running migrations...");

    const knexPath = path.join(__dirname, "node_modules", ".bin", "knex");
    const migrate = spawn(
      knexPath,
      [
        "migrate:latest",
        "--env",
        "development",
        "--knexfile",
        path.join(__dirname, "knexfile.js"),
      ],
      { shell: true }
    );

    migrate.stdout.on("data", (data) => console.log(data.toString()));
    migrate.stderr.on("data", (data) => console.error(data.toString()));
    migrate.on("close", (code) => {
      if (code === 0) {
        console.log("Setup completed successfully!");
      } else {
        console.error(`Migration process exited with code ${code}`);
      }
    });
  } catch (error) {
    console.error("Error during setup:", error);
  }
}

setup();

// require("dotenv").config();
// const { Client } = require("pg");
// const { spawn } = require("child_process");
// const path = require("path");

// const DB_NAME = process.env.DB_NAME || "expense_tracker_db";
// const DB_USER = process.env.DB_USER || "postgres";
// const DB_PASSWORD = process.env.DB_PASSWORD || "1234";
// const DB_HOST = process.env.DB_HOST || "localhost";
// const DB_PORT = process.env.DB_PORT || 5432;
// const NODE_ENV = process.env.NODE_ENV || "development";

// const isLocal = DB_HOST === "localhost" || DB_HOST === "127.0.0.1";

// async function setup() {
//   try {
//     if (isLocal) {
//       console.log("Running local setup...");

//       const client = new Client({
//         user: DB_USER,
//         host: DB_HOST,
//         database: "postgres",
//         password: DB_PASSWORD,
//         port: DB_PORT,
//       });

//       await client.connect();

//       const res = await client.query(
//         `SELECT 1 FROM pg_database WHERE datname='${DB_NAME}'`
//       );

//       if (res.rowCount === 0) {
//         console.log(`Database ${DB_NAME} does not exist. Creating...`);
//         await client.query(`CREATE DATABASE ${DB_NAME}`);
//         console.log(`Database ${DB_NAME} created successfully.`);
//       } else {
//         console.log(`Database ${DB_NAME} already exists.`);
//       }

//       await client.end();
//     } else {
//       console.log("Detected hosted DB, skipping database creation...");
//     }

//     console.log("Running migrations...");
//     const knexPath = path.join(__dirname, "node_modules", ".bin", "knex");

//     const migrate = spawn(
//       knexPath,
//       [
//         "migrate:latest",
//         "--env",
//         NODE_ENV,
//         "--knexfile",
//         path.join(__dirname, "knexfile.js"),
//       ],
//       { shell: true, stdio: "inherit" }
//     );

//     migrate.on("close", (code) => {
//       if (code === 0) {
//         console.log("Migrations completed successfully!");
//       } else {
//         console.error(`Migration process exited with code ${code}`);
//       }
//     });
//   } catch (error) {
//     console.error("Error during setup:", error);
//   }
// }

// setup();

require("dotenv").config();
const { Client } = require("pg");
const path = require("path");
const { exec } = require("child_process");

async function setup() {
  const DB_NAME = process.env.DB_NAME || "expense_tracker_db";
  const DB_USER = process.env.DB_USER || "postgres";
  const DB_PASSWORD = process.env.DB_PASSWORD || "1234";
  const DB_HOST = process.env.DB_HOST || "localhost";
  const DB_PORT = process.env.DB_PORT || 5432;
  const NODE_ENV = process.env.NODE_ENV || "development";

  const isLocal = DB_HOST === "localhost" || DB_HOST === "127.0.0.1";

  try {
    if (isLocal) {
      console.log("Running local setup...");

      const client = new Client({
        user: DB_USER,
        host: DB_HOST,
        database: "postgres",
        password: DB_PASSWORD,
        port: DB_PORT,
        ssl: false,
      });

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
    } else {
      console.log("Detected hosted DB, skipping database creation...");
    }

    console.log("Running migrations...");

    const knexPath = path.join(__dirname, "node_modules", ".bin", "knex");
    const migrateCommand = `"${knexPath}" migrate:latest --env ${NODE_ENV} --knexfile "${path.join(
      __dirname,
      "knexfile.js"
    )}"`;

    const { exec } = require("child_process");
    exec(migrateCommand, (err, stdout, stderr) => {
      if (err) console.error(err);
      if (stderr) console.error(stderr);
      console.log(stdout);
    });
  } catch (error) {
    console.error("Error during setup:", error);
  }
}

// Export setup function
module.exports = setup;

// If run directly, execute immediately
if (require.main === module) {
  setup();
}

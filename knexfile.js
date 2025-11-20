// require("dotenv").config();

// module.exports = {
//   development: {
//     client: "pg",
//     connection: process.env.DATABASE_URL,
//     migrations: {
//       directory: "./migrations",
//     },
//   },
//   test: {
//     client: "pg",
//     connection: process.env.DATABASE_URL,
//     migrations: {
//       directory: "./migrations",
//     },
//   },
//   production: {
//     client: "pg",
//     connection: process.env.DATABASE_URL,
//     migrations: {
//       directory: "./migrations",
//     },
//   },
// };

require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: false,
    },
    migrations: {
      directory: "./migrations",
    },
  },

  production: {
    client: "pg",
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    },
    migrations: {
      directory: "./migrations",
    },
  },
};

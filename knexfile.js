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
  production: {
    client: "pg",
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false, // accept self-signed certs
      },
    },
    migrations: {
      directory: "./migrations",
    },
  },
};

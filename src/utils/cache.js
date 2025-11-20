// const Redis = require("ioredis");
// const redis = new Redis({
//   host: process.env.REDIS_HOST,
//   port: process.env.REDIS_PORT,
//   password: process.env.REDIS_PASSWORD,
// });

// async function get(key) {
//   const data = await redis.get(key);
//   return data ? JSON.parse(data) : null;
// }

// async function set(key, value, ttlSeconds = 60) {
//   await redis.set(key, JSON.stringify(value), "EX", ttlSeconds);
// }

// async function del(key) {
//   await redis.del(key);
// }

// module.exports = { redis, get, set, del };

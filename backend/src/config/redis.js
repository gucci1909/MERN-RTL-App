import Redis from "ioredis";

const redis = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
  retryStrategy: (times) => {
    if (times > 10) return null;
    return Math.min(times * 100, 2000);
  },
});

// redis.set("message", "Hello Redis!");
// redis.get("message").then(console.log);

export default redis;

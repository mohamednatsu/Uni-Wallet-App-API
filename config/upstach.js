const { Redis } = require("@upstash/redis");
const { Ratelimit } = require("@upstash/ratelimit");

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const rateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(30, "60 s"),
    analytics: true, // optional
});

module.exports = rateLimit;

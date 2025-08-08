const rateLimit = require("../config/upstach");

const rateLimiter = async (req, res, next) => {
    try {
        const key = req.ip || req.headers["x-forwarded-for"] || "anonymous";
        const { success } = await rateLimit.limit(`rate-limit-${key}`);

        if (!success) {
            return res.status(429).json({ message: "Too many requests, please try again later" });
        }

        next();
    } catch (e) {
        console.error("Rate limiter error:", e);
        next(e);
    }
};

module.exports = rateLimiter;

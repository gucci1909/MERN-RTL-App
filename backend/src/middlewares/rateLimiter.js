import rateLimit from "express-rate-limit";

const apiLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5,
  message: {
    status: 429,
    message: "Too many requests, please try again later.",
  },
  keyGenerator: (req) => {
    return req.user?.id || req.ip;
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export default apiLimiter;

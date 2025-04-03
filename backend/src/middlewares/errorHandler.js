const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({ success: false, message });

  // Log the error using Winston
  import("../config/logger.js").then(({ default: logger }) => {
    logger.error(`${req.method} ${req.url} - ${statusCode}: ${message}`);
  });
};

export default errorHandler;

const errorMiddleware = (err, req, res, next) => {
  const httpCode = err.type === "validation" ? 400 : 500;

  res.status(httpCode).json({
    status: false,
    message: err.message,
    stack: err.stack,
  });
};

module.exports = { errorMiddleware };

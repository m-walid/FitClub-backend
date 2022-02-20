module.exports = (error, request, response, next) => {
  response.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message,
      // stack: process.env.NODE_ENV === "dev" ? error.stack : null,
    },
  });
};

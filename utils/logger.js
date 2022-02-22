const chalk = require("chalk");

const logger = {
  error: (message) => console.log(chalk.red(message)),
  warn: (message) => console.log(chalk.yellow(message)),
  info: (message) => console.log(chalk.green(message)),
  debug: (message) => console.log(chalk.blue(message)),
};
module.exports = {
  logger,
};

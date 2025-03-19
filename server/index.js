import server from "./server.js";
import { expressOptions, postgreSQLOptions } from "./env.js";
import { sequelizeConnection } from "./models/index.js";
import { logger } from "./server.js";

async function startServer() {
  try {
    await sequelizeConnection.sync({ alter: true });

    logger.info(`PostgreSQL connected on host: ${postgreSQLOptions.host}, port: ${postgreSQLOptions.port}`);

    server.listen(expressOptions.port, expressOptions.host, () => {
      logger.info(`Server is running on http://${expressOptions.host}:${expressOptions.port}`);
    });
  } catch (error) {
    logger.error(error.message);
  }
}

await startServer();

process.on("SIGINT", async () => {
  await sequelizeConnection.close();

  logger.info("PostgreSQL connection closed!");
  logger.info("Server stopped!");

  process.exit(0);
});

import server from "./server.js";
import { expressOptions } from "./env.js";
import { sequelizeConnection } from "./models/index.js";
import { logger } from "./server.js";

async function startServer() {
  try {
    await sequelizeConnection.sync({ force: true });

    logger.info("PostgreSQL connected!");

    server.listen(expressOptions.port, expressOptions.host, () => {
      logger.info(`Server is running on http://${expressOptions.host}:${expressOptions.port}`);
    });
  } catch (error) {
    logger.error(error.message);
  }
}

startServer();

process.on("SIGINT", async () => {
  await sequelizeConnection.close();

  logger.info("PostgreSQL connection closed!");
  logger.info("Server stopped!");

  process.exit(0);
});

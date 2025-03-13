import server from "./server.js";
import { expressOptions } from "./env.js";
import sequelizeConfig from "./models/index.js";
import { logger } from "./server.js";

async function startServer() {
  try {
    await sequelizeConfig.sync({ force: false });

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
  await sequelizeConfig.close();

  logger.info("PostgreSQL connection closed!");
  logger.info("Server stopped!");

  process.exit(0);
});

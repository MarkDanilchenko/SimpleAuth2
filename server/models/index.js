import Sequelize from "sequelize";
import { postgreSQLOptions } from "../env.js";

const sequelize = new Sequelize(
  postgreSQLOptions.databaseName,
  postgreSQLOptions.username,
  postgreSQLOptions.password,
  {
    dialect: "postgres",
    host: postgreSQLOptions.host,
    port: postgreSQLOptions.port,
    define: {
      timestamps: false,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
);

export default sequelize;

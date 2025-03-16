import Sequelize from "sequelize";
import { postgreSQLOptions } from "../env.js";
import JwtModelInit from "./jwt.js";
import UserModelInit from "./user.js";

// pool
const sequelizeConnection = new Sequelize(
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
  }
);

// init models
const User = UserModelInit(sequelizeConnection);
const Jwt = JwtModelInit(sequelizeConnection);

// associations
Jwt.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE", onUpdate: "CASCADE" });
User.hasOne(Jwt, { foreignKey: "userId", onDelete: "CASCADE", onUpdate: "CASCADE" });

export { sequelizeConnection, Jwt, User };

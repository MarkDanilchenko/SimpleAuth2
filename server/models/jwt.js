import { sequelizeConfig, Sequelize } from "./index.js";
import { User } from "./user.js";

const Jwt = sequelizeConfig.define("jwt", {
  id: {
    type: Sequelize.UUIDV4,
    allowNull: false,
    unique: true,
    primaryKey: true,
  },
  refresh_token: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  userId: {
    type: Sequelize.UUIDV4,
    allowNull: false,
    unique: true,
    references: {
      model: User,
      key: "id",
      cascade: true,
    },
  },
});

Jwt.belongsTo(User, { foreignKey: "userId" });
User.hasOne(Jwt, { foreignKey: "userId" });

export { Jwt };

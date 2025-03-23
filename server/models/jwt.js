import { DataTypes } from "sequelize";

export default function JwtModelInit(sequelizeConfig) {
  const Jwt = sequelizeConfig.define("jwt", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    refresh_token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
  });

  return Jwt;
}

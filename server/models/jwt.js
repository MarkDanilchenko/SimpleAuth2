import { DataTypes } from "sequelize";

export default function JwtModelInit(sequelizeConfig) {
  const Jwt = sequelizeConfig.define("jwt", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    refresh_token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  return Jwt;
}

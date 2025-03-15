import { DataTypes } from "sequelize";

export default function UserModel(sequelizeConfig) {
  const User = sequelizeConfig.define(
    "users",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          is: /^[a-zA-Z]{2,}$/i,
        },
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          is: /^[a-zA-Z]{2,}$/i,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          is: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          is: /^(male|female)$/i,
        },
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      paranoid: true,
      timestamps: true,
    },
  );

  return User;
}

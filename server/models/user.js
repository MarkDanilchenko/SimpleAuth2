import { Sequelize, sequelizeConfig } from "./index.js";

const User = sequelizeConfig.define(
  "user",
  {
    id: {
      type: Sequelize.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    first_name: {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        is: /^[a-zA-Z]{2,}$/i,
      },
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        is: /^[a-zA-Z]{2,}$/i,
      },
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/gi,
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    gender: {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        is: /^(male|female)$/i,
      },
    },
    avatar: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    deletedAt: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  },
  {
    paranoid: true,
    timestamps: true,
  },
);

export { User };

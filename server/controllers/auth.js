import { Jwt, User } from "../models/index.js";
import { Op } from "sequelize";
import { badRequestError, notFoundError, unauthorizedError } from "../utils/errors.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { expressOptions } from "../env.js";
import fs from "fs";
import { logger } from "../server.js";

class AuthController {
  async signup(req, res) {
    const { username, firstName, lastName, email, password, gender } = req.body;
    const avatar = req.files.avatar[0].path;

    const isUserExists = await User.findOne({
      where: {
        [Op.or]: [{ email }, { username }],
      },
    });
    if (isUserExists) {
      return badRequestError(res, "User already exists!");
    }

    try {
      const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

      await User.create({
        username,
        firstName,
        lastName,
        email,
        password: hashedPassword,
        gender,
        avatar,
      });

      res.status(201);
      res.end();
    } catch (error) {
      if (req.files) {
        Object.values(req.files).forEach((file) => {
          fs.unlink(file[0].path, (error) => {
            if (error) {
              logger.error(error.message);
            }
          });
        });
      }

      badRequestError(res, error.message);
    }
  }

  async signin(req, res) {
    const { username, email, password } = req.body;

    const user = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });
    if (!user) {
      return notFoundError(res, "User not found!");
    }

    const checkPassword = crypto.createHash("sha256").update(password).digest("hex") === user.password;
    if (!checkPassword) {
      return unauthorizedError(res, "Wrong password!");
    }

    try {
      const accessToken = jwt.sign({ userId: user.id }, expressOptions.jwtSecret, {
        expiresIn: expressOptions.jwtAccessExpiresIn,
      });
      const refreshToken = jwt.sign({ userId: user.id }, expressOptions.jwtSecret, {
        expiresIn: expressOptions.jwtRefreshExpiresIn,
      });

      const relatedRefreshToken = await Jwt.findOne({
        where: {
          userId: user.id,
        },
      });

      if (relatedRefreshToken) {
        await Jwt.update(
          {
            refresh_token: refreshToken,
          },
          {
            where: {
              userId: user.id,
            },
          }
        );
      }

      await Jwt.create({
        refresh_token: refreshToken,
        userId: user.id,
      });

      res.status(200);
      res.send(JSON.stringify({ accessToken }));
      res.end();
    } catch (error) {
      logger.error(error.message);

      badRequestError(res, "Something went wrong! Please, try again.");
    }
  }

  async refresh(req, res) {
    try {
    } catch (error) {}
  }

  async signout(req, res) {
    try {
    } catch (error) {}
  }
}

const authController = new AuthController();

export default authController;

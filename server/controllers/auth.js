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

    const isUserExists = await User.findOne(
      {
        where: {
          [Op.and]: [{ email }, { username }],
        },
      },
      { paranoid: false }
    );
    if (isUserExists) {
      return badRequestError(res, "User already exists!");
    }

    try {
      const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

      await User.create({
        username,
        first_name: firstName,
        last_name: lastName,
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

    const searchCondition = username ? { username } : { email };
    const user = await User.findOne({
      where: searchCondition,
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
          { refresh_token: refreshToken },
          {
            where: {
              userId: user.id,
            },
          }
        );
      } else {
        await Jwt.create({
          refresh_token: refreshToken,
          userId: user.id,
        });
      }

      res.status(200);
      res.send(JSON.stringify({ accessToken }));
      res.end();
    } catch {
      badRequestError(res, "Something went wrong! Please, try again.");
    }
  }

  async signout(req, res) {
    try {
      const accessToken = req.headers.authorization.split(" ")[1];

      const { userId } = jwt.decode(accessToken);

      const user = await User.findOne({
        where: {
          id: userId,
        },
      });
      if (!user) {
        return notFoundError(res, "User not found!");
      }

      await Jwt.destroy({
        where: {
          userId: user.id,
        },
      });

      res.status(200);
      res.end();
    } catch (error) {
      badRequestError(res, error.message);
    }
  }

  async refresh(req, res) {
    try {
      const accessToken = req.headers.authorization && req.headers.authorization.split(" ")[1];
      if (!accessToken) {
        return unauthorizedError(res, "Access token not found!");
      }

      const { userId } = jwt.decode(accessToken);

      const user = await User.findOne({
        where: {
          id: userId,
        },
      });
      if (!user) {
        return notFoundError(res, "User not found!");
      }

      const refreshToken = await Jwt.findOne({
        where: {
          userId: user.id,
        },
      });
      if (!refreshToken) {
        return unauthorizedError(res, "Refresh token not found! User is not signed in.");
      }

      jwt.verify(refreshToken.refresh_token, expressOptions.jwtSecret, async (error) => {
        if (error) {
          await Jwt.destroy({
            where: {
              userId: user.id,
            },
          });

          return unauthorizedError(res, "Refresh token is not valid! User is not signed in.");
        }

        const accessToken = jwt.sign({ userId: user.id }, expressOptions.jwtSecret, {
          expiresIn: expressOptions.jwtAccessExpiresIn,
        });

        res.status(200);
        res.send(JSON.stringify({ accessToken }));
        res.end();
      });
    } catch (error) {
      badRequestError(res, error.message);
    }
  }
}

const authController = new AuthController();

export default authController;

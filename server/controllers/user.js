import jwt from "jsonwebtoken";
import { User, Jwt } from "../models/index.js";
import { badRequestError, notFoundError, unauthorizedError } from "../utils/errors.js";
import crypto from "crypto";

class UserController {
  async retrieveProfile(req, res) {
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

      user.password = undefined;

      res.status(200);
      res.send(JSON.stringify(user));
      res.end();
    } catch (error) {
      badRequestError(res, error.message);
    }
  }

  async updateProfile(req, res) {
    try {
    } catch (error) {}
  }

  async deleteProfile(req, res) {
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

      await User.destroy({
        where: {
          id: user.id,
        },
      });

      await Jwt.destroy({
        where: {
          userId: user.id,
        },
      });

      res.status(204);
      res.end();
    } catch (error) {
      badRequestError(res, error.message);
    }
  }

  async restoreProfile(req, res) {
    try {
      const { email, username, password } = req.body;

      const searchCondition = username ? { username } : { email };
      const user = await User.findOne({
        where: searchCondition,
        paranoid: false,
      });
      if (!user) {
        return notFoundError(res, "User not found!");
      }

      const checkPassword = crypto.createHash("sha256").update(password).digest("hex") === user.password;
      if (!checkPassword) {
        return unauthorizedError(res, "Wrong password!");
      }

      await user.restore();

      res.status(200);
      res.end();
    } catch (error) {
      badRequestError(res, error.message);
    }
  }
}

const userController = new UserController();

export default userController;

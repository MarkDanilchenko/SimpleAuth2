import jwt from "jsonwebtoken";
import { User, Jwt } from "../models/index.js";

import { badRequestError, notFoundError } from "../utils/errors.js";

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
    } catch (error) {}
  }
}

const userController = new UserController();

export default userController;

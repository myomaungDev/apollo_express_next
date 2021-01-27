import { ApolloError } from "apollo-server-express";
import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { User } from "../models";
const AuthMiddleware = async (req, res, next) => {
  const authHeader = req.get("Authorization");

  try {
    if (authHeader) {
      let token = authHeader.split(" ")[1];
      if (!token || token === "") {
        req.isAuth = false;
        next();
      } else {
        let decoded_Token = verify(token, JWT_SECRET);
        if (decoded_Token) {
          let authuser = await User.findById(decoded_Token.user._id);

          if (authuser) {
            req.user = authuser;
            req.isAuth = true;
            next();
          } else {
            req.isAuth = false;
            next();
          }
        } else {
          req.isAuth = false;
          next();
        }
      }
    } else {
      req.isAuth = false;
      next();
    }
  } catch (error) {
    throw new ApolloError(error.message, 401);
  }
};

export default AuthMiddleware;

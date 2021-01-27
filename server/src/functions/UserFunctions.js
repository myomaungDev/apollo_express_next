import { sign } from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export const AssignToken = async (user) => {
  let token = await sign({ user }, JWT_SECRET, { expiresIn: "1d" });
  return `JWT ${token}`;
};

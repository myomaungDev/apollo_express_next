import { config } from "dotenv";
const { parsed } = config();
export const {
  DB,
  PORT,
  BASE_URL,
  URL = `${BASE_URL + PORT}`,
  JWT_SECRET,
} = parsed;

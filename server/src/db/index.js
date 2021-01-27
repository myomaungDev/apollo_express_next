import mongoose from "mongoose";
import { DB } from "../config";
import { success, error } from "consola";
const connect_DB = () => {
  try {
    mongoose
      .connect(DB, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then(() => {
        success({
          message: `DB connected successfully`,
          badge: true,
        });
      });
  } catch (e) {
    error({
      message: e.message,
      badge: true,
    });
  }
};

export default connect_DB;

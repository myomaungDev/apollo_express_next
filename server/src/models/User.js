import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Email must not be empty"],
      unique: [true, "Email is already used"],
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    avatarImg: {
      type: String,
      default: "http://localhost:8080/uploads/default_user.jpeg",
    },
  },
  { timestamps: true }
);

export default model("user", userSchema);

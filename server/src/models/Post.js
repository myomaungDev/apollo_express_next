import { model, Schema } from "mongoose";

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    featureImg: {
      type: String,
    },
    author: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default model("post", postSchema);

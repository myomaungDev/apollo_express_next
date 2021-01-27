import baseResolvers from "./base";
import postResolvers from "./Post";
import ImageUploaderResolvers from "./ImageUploader";
import UserResolvers from "./user";
export default [
  baseResolvers,
  postResolvers,
  ImageUploaderResolvers,
  UserResolvers,
];

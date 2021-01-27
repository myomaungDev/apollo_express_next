import { ApolloError } from "apollo-server-express";
import bcrypt from "bcrypt";
import { AssignToken } from "../../functions";
export default {
  Query: {
    get_all_users: async (_, args, { User }, info) => {
      let user = await User.find();
      return user;
    },
    get_user_by_id: async (_, { id }, { User }, info) => {
      let user = await User.findById(id);
      return user;
    },
    authenticated_Profile: async (_, {}, { user }, info) => user,
  },
  Mutation: {
    createUser: async (_, { NewUser }, { User }, info) => {
      try {
        let { email, password } = NewUser;
        let cryptedpassword = bcrypt.hashSync(password, 12);
        const findUser = await User.findOne({ email });
        if (findUser) {
          throw new Error("Email is already taken");
        } else {
          let user = new User(NewUser);
          user.password = cryptedpassword;
          let result = await user.save();
          if (result) {
            let access_token = AssignToken(result);
            return {
              user: result,
              success: true,
              message: "User created successfully",
              access_token: access_token,
            };
          } else {
            throw new Error("Register fail!");
          }
        }
      } catch (error) {
        throw new ApolloError(error.message, 400);
      }
    },
    loginUser: async (_, { LoginUser }, { User }, info) => {
      try {
        let { email, password } = LoginUser;
        let checkUser = await User.findOne({ email });
        if (checkUser) {
          let correctPassword = bcrypt.compareSync(
            password,
            checkUser.password
          );
          if (correctPassword) {
            let access_token = AssignToken(checkUser);
            return {
              user: checkUser,
              access_token: access_token,
              message: "User login successfully",
              success: true,
            };
          } else {
            throw new Error("User password incorrect!");
          }
        } else {
          throw new Error("User Email does not Found!");
        }
      } catch (error) {
        throw new ApolloError(error.message);
      }
    },
    updateUser: async (req, { UpdateUser }, context, ctx) => {
      let { isAuth, User, user } = context;

      try {
        if (isAuth) {
          let checkUser = await User.findById(user._id);
          if (checkUser) {
            checkUser.firstname = UpdateUser.firstname;
            checkUser.lastname = UpdateUser.lastname;
            checkUser.username = UpdateUser.username;
            const result = await checkUser.save();
            if (result) {
              return result;
            } else {
              throw new ApolloError("Update fail");
            }
          } else {
            throw new ApolloError("User does not found!");
          }
        } else {
          throw new ApolloError("Unauthenticated User");
        }
      } catch (error) {
        throw new ApolloError(error.message);
      }
    },
  },
};

const User = require("../../models/User");
const { userHandler } = require("../../utils/graphqlUtls");

const user = async (userId) => {
  const isuser = await User.findById(userId);

  try {
    isuser.map((user) => {
      return {
        ...user._doc,
        _id: user.id,
      };
    });
  } catch (err) {
    throw err;
  }
};

module.exports = {
  //this route return all users
  users: async (arg, req) => {
    try {
      const users = await User.find();
      return users.map((user) => {
        return {
          ...user._doc,
          _id: user.id,
        };
      });
    } catch (err) {
      throw err;
    }
  },

  user: async (arg, req) => {
    try {
      const user = await User.findById(arg.id);
      if (!user) {
        throw new Error("User not found");
      }
      return userHandler(user);
    } catch (err) {
      throw err;
    }
  },

  createUser: async (args, req) => {
    const isUser = await User.findOne({ email: args.userInput.email });

    if (isUser) {
      throw new Error("User already exist");
    }
    try {
      const newUser = await new User({
        name: args.userInput.email,
        email: args.userInput.email,
        password: args.userInput.password,
      }).save();

      return userHandler(newUser);
    } catch (err) {
      throw err;
    }
  },
};

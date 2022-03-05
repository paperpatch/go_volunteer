const { User, Event, Category, Comment, EventLike } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find();
    },

    events: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name
        };
      }

      return await Event.find(params).populate('category');
    },

    event: async (parent, { _id }) => {
      return await Event.findById(_id).populate('category');
    },

    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("events")
        return userData;
      }
      throw new AuthenticationError("Not logged in");
    },

    // get all users
    users: async () => {
      return await User.find()
        .select("-__v -password")
        .populate("events")
    },

    user: async () => {
      return await User.find()
        .select("-__v -password")
        .populate("events")
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);

      if (!user) {
        throw new Error(
          "Something went wrong when signing up. Please try again."
        );
      }
      const token = signToken(user);
      return { user, token };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect login information");
      }

      const correctPassword = await user.isCorrectPassword(password);

      if (!correctPassword) {
        throw new AuthenticationError("Incorrect login information");
      }

      const token = signToken(user);
      return { token, user };
    },

    createEvent: async (parent, args, context) => {
      if (context.user) {
        const event = await Event.create({ ...args, host: context.user._id });

        if (!event) {
          throw new Error(
            "Something went wrong when creating your event. Please try again."
          );
        }
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { events: event._id } },
          { new: true }
        );

        return event;
      } else {
        throw new AuthenticationError(
          "You need to be logged in to create an event!"
        );
      }
    },

    joinEvent: async (parent, { eventId }, context) => {
      if (context.user) {
        //add to users events array
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { events: eventId } },
          { new: true }
        );
        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    leaveEvent: async (parent, { eventId }, context) => {
      if (context.user) {
        //take from users events array
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { events: eventId } },
          { new: true }
        );
        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    cancelEvent: async (parent, { eventId }, context) => {
      if (context.user) {
        const removeEvent = await Event.findByIdAndRemove({ _id: eventId });
        return removeEvent;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
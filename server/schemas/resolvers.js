const { User, Event, Category, Comment, EventLike } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find();
    },

    events: async (parent, { category, title }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (title) {
        params.title = {
          $regex: title
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
          .populate({ path: "events", populate: "host" })
          .populate("connections");

        return userData;
      }
      throw new AuthenticationError("Not logged in");
    },

    // get all users
    users: async () => {
      return await User.find()
        .select("-__v -password")
        .populate("events")
        .populate({ path: "events", populate: "verify" });
    },

    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.products',
          populate: 'category'
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },

    // find user by id
    // user: async (parent, { _id }) => {
    //   return await User.findOne({ _id })
    //     .select("-__v -password")
    //     .populate("events")
    //     .populate({ path: "events", populate: "host" })
    //     .populate("connections")
    // },

    // // get all events
    // events: async () => {
    //   return await Event.find()
    //     .sort({ date: -1 })
    //     .populate("host")
    //     .populate("attendees")
    //     .populate("comments")
    //     .populate("eventLikes")
    //     .populate({ path: "comments", populate: "author" })
    //     .select("-__v");
    // },

    // event: async (parent, { _id }) => {
    //   const searchedEvent = await Event.findOne({ _id })
    //     .sort({ date: -1 })
    //     .populate("host")
    //     .populate("attendees")
    //     .populate("comments")
    //     .populate("eventLikes")
    //     .populate({ path: "comments", populate: "author" })
    //     .populate("eventLikes")
    //     .select("-__v");
    //   return searchedEvent;
    // },
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

    //add connection
    addConnection: async (parent, { connectionId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { connections: connectionId } },
          { new: true }
        ).populate("connections");

        const userToBeAdded = User.findOne({
          _id: connectionId,
        });

        return userToBeAdded;
      }
      throw new AuthenticationError(
        "You need to be logged in to add connections."
      );
    },

    // remove connection
    removeConnection: async (parent, { connectionId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { connections: connectionId } },
          { new: true }
        ).populate("connections");

        return updatedUser;
      }
      throw new AuthenticationError(
        "You need to be logged in to add or remove connections."
      );
    },

    // add comment to event or a good deed
    addEventComment: async (parent, args, context) => {
      if (context.user) {
        const comment = await Comment.create({
          ...args,
          author: context.user._id,
        });

        const updatedEvent = await Event.findByIdAndUpdate(
          { _id: args.eventId },
          { $push: { comments: comment } },
          { new: true }
        )
          .populate("host")
          .populate("attendees")
          .populate("comments")
          .populate({ path: "comments", populate: "author" })
          .select("-__v");
        return updatedEvent;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    //add reply to comment
    addReply: async (parent, { commentId, replyBody }, context) => {
      console.log(context.user);
      if (context.user) {
        const updatedComment = await Comment.findOneAndUpdate(
          { _id: commentId },
          { $push: { replies: { replyBody, author: context.user._id } } },
          { new: true, runValidators: true }
        )
          .populate("replies")
          .populate({ path: "replies", populate: "author" });

        return updatedComment;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    joinEvent: async (parent, { eventId }, context) => {
      if (context.user) {
        const updatedEvent = await Event.findOneAndUpdate(
          { _id: eventId },
          { $addToSet: { attendees: context.user._id } },
          { new: true }
        );

        //add to users events array
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { events: eventId } },
          { new: true }
        );
        return updatedEvent.populate("attendees");
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    leaveEvent: async (parent, { eventId }, context) => {
      if (context.user) {
        const updatedEvent = await Event.findOneAndUpdate(
          { _id: eventId },
          { $pull: { attendees: context.user._id } },
          { new: true }
        );

        //take from users events array
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { events: eventId } },
          { new: true }
        );
        return updatedEvent.populate("attendees");
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

    removeComment: async (parent, args, context) => {
      if (context.user) {
        const removedComment = await Comment.findByIdAndRemove(
          { _id: args.commentId },
          { new: true }
        );

        // if params are event-oriented, update the event, otherwise update the good deed
        if (args.eventId) {
          const updatedEvent = await Event.findByIdAndUpdate(
            { _id: args.eventId },
            { $pull: { comments: removedComment } },
            { new: true }
          )
            .populate("comments")
            .populate({ path: "comments", populate: "author" });
          return updatedEvent;
        } else if (args.goodDeedId) {
          const updatedGoodDeed = await GoodDeed.findByIdAndUpdate(
            { _id: args.goodDeedId },
            { $pull: { comments: removedComment } },
            { new: true }
          ).populate("helper");
          return updatedGoodDeed.populate({
            path: "comments",
            populate: "author",
          });
        } else {
          throw new Error("Something went wrong!");
        }
      }
      throw new AuthenticationError("need logged in!");
    },

    addEventLike: async (parent, args, context) => {
      if (context.user) {
        const createdLike = await EventLike.create({
          event: args.eventId,
          user: context.user._id,
          eventLikes: 1,
        });

        const updatedEvent = await Event.findByIdAndUpdate(
          { _id: args.eventId },
          {
            $push: {
              eventLikes: createdLike,
            },
          },
          { new: true }
        ).populate("eventLikes");

        return updatedEvent;
      }
      throw new AuthenticationError("need logged in!");
    },
  },
};

module.exports = resolvers;
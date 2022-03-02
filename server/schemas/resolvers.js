const {
  User,
  Event,
  EventLike,
  Comment,
  Verify
} = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // USERS

    // find current logged in user
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('thoughts')
          .populate('friends');

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },

    // get all users
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('thoughts')
        .populate('friends');
    },

    // get one user by ID
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('friends')
        .populate('thoughts');
    },

    // EVENTS

    // get all events
    events: async () => {
      return await Event.find()
        .sort({ date: -1 })
        .populate("host")
        .populate("attendees")
        .populate("eventLikes")
        .populate({ path: "comments", populate: "author" })
        .populate("verify")
        .select('-__v');
    },

    // get one event by ID
    event: async (parent, { _id }) => {
      return await Event.findOne({ _id })
        .sort({ date: -1 })
        .populate("host")
        .populate("attendees")
        .populate("comments")
        .populate("eventLikes")
        .populate({ path: "comments", populate: "author" })
        .populate("verify")
        .select('-__v');
    }

  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
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
  }
};

module.exports = resolvers;

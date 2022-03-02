const { Schema, model } = require("mongoose");
const dateFormatter = require("../utils/dateFormat");

const eventSchema = new Schema(
  {
    host: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 280,
    },
    attendees: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    location: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 560,
    },
    date: {
      type: Date,
      required: true,
      get: (timestamp) =>
        dateFormatter(timestamp, { dateSuffix: false, monthLength: "Long" }),
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1513477967668-2aaf11838bd6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3774&q=80",
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    eventLikes: [
      {
        type: Schema.Types.ObjectId,
        ref: "EventLike",
      },
    ],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

const Event = model("Event", eventSchema);

module.exports = Event;
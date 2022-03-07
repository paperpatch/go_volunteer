const { Schema, model } = require("mongoose");
const dateFormatter = require("../utils/dateFormat");
const EventLike = require('./EventLike');
const User = require('./User');

const eventSchema = new Schema(
  {
    host: {
      type: String,
      ref: "User",
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 280,
    },
    // attendees: [ Schema.Types.ObjectId ],
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
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
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
    // comments: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Comment",
    //   },
    // ],
    eventLikes: [ EventLike.schema ],
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
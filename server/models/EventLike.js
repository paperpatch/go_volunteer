const { Schema, model } = require("mongoose");

const EventLikeSchema = new Schema({
  event: {
    type: Schema.Types.ObjectId,
    ref: "Event",
  },
  eventLike: {
    type: Number,
    default: 0,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const EventLike = model("EventLike", EventLikeSchema);

module.exports = EventLike;
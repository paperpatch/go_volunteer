const { Schema, model } = require("mongoose");
const User = require('./User');

const EventLikeSchema = new Schema({
  event: {
    type: Schema.Types.ObjectId,
    ref: "Event",
  },
  eventLike: {
    type: Number,
    default: 0,
  },
  user: [ User.schema ],
});

const EventLike = model("EventLike", EventLikeSchema);

module.exports = EventLike;
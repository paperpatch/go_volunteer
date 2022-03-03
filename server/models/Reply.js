const { Schema } = require("mongoose");
const dateFormatter = require("../utils/dateFormat");
const User = require('./User');

const replySchema = new Schema(
  {
    replyBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    author: [ User.schema ],
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormatter(timestamp),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);


module.exports = replySchema;
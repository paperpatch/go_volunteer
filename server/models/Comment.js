const { Schema, model } = require("mongoose");
const replySchema = require("./Reply");
const dateFormat = require("../utils/dateFormat");

const commentSchema = new Schema(

  {
    commentText: {
      type: String,
      required: 'You need to leave a comment!',
      trim: true,
      maxlength: [280, 'Comment is too long!']
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    likes: {
      type: Number,
      default: 0
    },
    replies: [replySchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
)

commentSchema.virtual('replyCount').get(function () {
  return this.replies.length;
});

const Comment = model('Comment', commentSchema)

module.exports = Comment
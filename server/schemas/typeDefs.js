const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
  }

  type User {
    _id: ID
    firstName: String!
    lastName: String!
    email: String!
    location: String
    profilePicture: String
    connections: [User]
    events: [Event]
  }

  type Auth {
    user: User
    token: ID!
  }

  type Event {
    _id: ID
    host: User
    title: String
    attendees: [User]
    location: String
    description: String
    date: String
    startTime: String
    endTime: String
    url: String
    image: String
    createdAt: String
    comments: [Comment]
    eventLikes: [EventLike]
  }

  type Comment {
    _id: ID
    author: User
    commentText: String
    createdAt: String
    likes: Int
    replies: [Reply]
  }

  type Reply {
    _id: ID
    author: User
    replyBody: String
    createdAt: String
  }

  type EventLike {
    _id: ID
    event: Event
    eventLikes: Int
    user: User
  }

  type Query {
    me: User
    categories: [Category]
    users: [User]
    user(_id: ID!): User
    events: [Event]
    event(_id: ID): Event
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth
    login(email: String!, password: String!): Auth
    createEvent(
      title: String!
      location: String!
      description: String!
      date: String!
      startTime: String!
      endTime: String!
      url: String!
      image: String!
    ): Event
    addConnection(connectionId: ID!): User
    removeConnection(connectionId: ID!): User
    addEventComment(eventId: ID, commentText: String!): Event
    addReply(commentId: ID!, replyBody: String!): Comment
    joinEvent(eventId: ID!): Event
    leaveEvent(eventId: ID!): Event
    cancelEvent(eventId: ID!): Event
    removeComment(commentId: ID!, eventId: ID): Event
    addEventLike(eventId: ID!): Event
  }
`;

module.exports = typeDefs;
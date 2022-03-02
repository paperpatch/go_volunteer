const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    profilePicture: String
    events: [Event]
  }

  type Auth {
    token: ID
    user: User
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
    verify: [Verify]
    isVerified: Boolean
  }

  type EventLike {
    _id: ID
    event: Event
    eventLikes: Int
    user: User
  }

  type Verify {
    _id: ID
    event: Event
    verifyNumber: Int
    user: User
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

  type Query {
    me: User
    user(username: String!): User
    users: [User]
    event(_id: ID): Event
    events: [Event]
  }

  type Mutation {
    addUser(
      firstName: String!,
      lastName: String!,
      email: String!,
      password: String!,
    ): Auth

    updateUser(
      firstName: String,
      lastName: String,
      email: String,
      password: String
    ): User

    login(
      email: String!,
      password: String!
    ): Auth

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

    addEventComment(
      eventId: ID,
      commentText: String!
    ): Event

    removeComment(
      commentId: ID!,
      eventId: ID,
    ): Event

    joinEvent(eventId: ID!): Event
    leaveEvent(eventId: ID!): Event
    cancelEvent(eventId: ID!): Event
    addEventLike(eventId: ID!): Event
  }
`;

module.exports = typeDefs;

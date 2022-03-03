import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const CREATE_EVENT = gql`
  mutation createEvent(
    $title: String!
    $location: String!
    $description: String!
    $date: String!
    $startTime: String!
    $endTime: String!
    $url: String!
    $image: String!
  ) {
    createEvent(
      title: $title
      location: $location
      description: $description
      date: $date
      startTime: $startTime
      endTime: $endTime
      url: $url
      image: $image
    ) {
      _id
      host {
        _id
      }
      title
      location
      description
      date
      startTime
      endTime
      url
      image
    }
  }
`;

export const JOIN_EVENT = gql`
  mutation joinEvent($eventId: ID!) {
    joinEvent(eventId: $eventId) {
      _id
      host {
        _id
      }
      title
      attendees {
        _id
      }
      location
      description
      date
      startTime
      endTime
      url
      image
    }
  }
`;

export const LEAVE_EVENT = gql`
  mutation leaveEvent($eventId: ID!) {
    leaveEvent(eventId: $eventId) {
      _id
      host {
        _id
      }
      title
      attendees {
        _id
      }
      location
      description
      date
      startTime
      endTime
      url
      image
      comments {
        _id
        author {
          _id
        }
        commentText
        likes
        replies {
          _id
          author {
            _id
          }
        }
      }
    }
  }
`;

export const CANCEL_EVENT = gql`
  mutation Mutation($eventId: ID!) {
    cancelEvent(eventId: $eventId) {
      _id
      title
    }
  }
`;

export const ADD_EVENT_COMMENT = gql`
  mutation Mutation($commentText: String!, $eventId: ID) {
    addEventComment(commentText: $commentText, eventId: $eventId) {
      _id
      host {
        _id
        firstName
        lastName
      }
      title
      attendees {
        _id
      }
      location
      description
      date
      startTime
      endTime
      url
      comments {
        _id
        author {
          _id
        }
        commentText
        createdAt
        likes
      }
      image
    }
  }
`;

export const ADD_REPLY = gql`
  mutation AddReply($commentId: ID!, $replyBody: String!) {
    addReply(commentId: $commentId, replyBody: $replyBody) {
      _id
      commentText
      replies {
        replyBody
        author {
          firstName
        }
      }
    }
  }
`;

export const REMOVE_COMMENT = gql`
  mutation removeComment($commentId: ID!, $eventId: ID, $goodDeedId: ID) {
    removeComment(
      commentId: $commentId
      eventId: $eventId
      goodDeedId: $goodDeedId
    ) {
      _id
      host {
        _id
      }
      title
      attendees {
        _id
      }
      location
      description
      date
      startTime
      endTime
      url
      image
      comments {
        _id
        author {
          _id
        }
        commentText
        replies {
          _id
          author {
            _id
          }
          replyBody
        }
      }
    }
  }
`;
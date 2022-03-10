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
      user {
        _id
      }
      token
    }
  }
`;

export const CREATE_EVENT = gql`
  mutation createEvent(
    $host: String!
    $category: String!
    $title: String!
    $location: String!
    $description: String!
    $date: String!
    $startTime: String!
    $endTime: String!
    $url: String!
    $image: String!
  ) {
    createEvent (
      host: $host
      category: $category
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
      host
      category {
        _id
        name
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
      host
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

export const LEAVE_EVENT = gql`
  mutation leaveEvent($eventId: ID!) {
    leaveEvent(eventId: $eventId) {
      _id
      host
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

export const CANCEL_EVENT = gql`
  mutation Mutation($eventId: ID!) {
    cancelEvent(eventId: $eventId) {
      _id
      title
    }
  }
`;
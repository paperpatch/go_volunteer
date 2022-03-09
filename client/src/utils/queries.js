import { gql } from "@apollo/client";

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      firstName
      lastName
      email
      location
      profilePicture
      events {
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
  }
`;

export const QUERY_USER = gql`
  {
    user {
      _id
      firstName
      lastName
      location
      profilePicture
      events {
        _id
        host
        title
        location
        description
        startTime
        date
        endTime
        url
      }
    }
  }
`;

export const QUERY_USERS = gql`
  query users {
    users {
      _id
      firstName
      lastName
      email
      location
      profilePicture
      events {
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
  }
`;

export const QUERY_EVENTS = gql`
  query getEvents($category: ID) {
    events(category: $category) {
      _id
      category {
        _id
        name
      }
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

export const QUERY_EVENT = gql`
  query Event($id: ID) {
    event(_id: $id) {
      _id
      category {
        _id
        name
      }
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
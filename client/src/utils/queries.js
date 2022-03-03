import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
    me {
      _id
      firstName
      lastName
      email
      location
      profilePicture
      events {
        _id
        host {
          _id
          firstName
          lastName
        }
        title
        location
        description
        date
        startTime
        endTime
        url
        image
        attendees {
          _id
        }
      }
    }
  }
`;

export const QUERY_USER = gql`
  query Query($id: ID!) {
    user(_id: $id) {
      _id
      firstName
      lastName
      location
      profilePicture
      connections {
        _id
        firstName
        lastName
      }
      events {
        _id
        host {
          _id
          lastName
          firstName
        }
        title
        attendees {
          _id
        }
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
      connections {
        _id
        firstName
        lastName
      }
      events {
        _id
        host {
          _id
          firstName
          lastName
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
  }
`;

export const QUERY_EVENT = gql`
  query Event($id: ID) {
    event(_id: $id) {
      _id
      host {
        _id
        firstName
        lastName
      }
      title
      attendees {
        _id
        firstName
        lastName
      }
      location
      isVerified
      description
      date
      startTime
      endTime
      url
      image
      comments {
        _id
        author {
          lastName
          firstName
          _id
        }
        replies {
          _id
          author {
            firstName
            _id
            lastName
          }
          replyBody
          createdAt
        }
        commentText
        createdAt
      }
      eventLikes {
        _id
        eventLikes
        user {
          _id
        }
        event {
          _id
        }
      }
      verify {
        _id
        user {
          _id
        }
        event {
          _id
        }
        verifyNumber
      }
    }
  }
`;

export const QUERY_EVENTS = gql`
  {
    events {
      _id
      host {
        _id
        firstName
        lastName
      }
      title
      attendees {
        _id
        firstName
        lastName
      }
      location
      description
      date
      isVerified
      startTime
      verify {
        _id
        user {
          _id
        }
        event {
          _id
        }
        verifyNumber
      }
      endTime
      url
      image
      comments {
        _id
        commentText
        createdAt
        replies {
          _id
          replyBody
        }
        author {
          _id
          firstName
          lastName
        }
      }
      eventLikes {
        _id
        user {
          _id
        }
        eventLikes
        event {
          _id
        }
      }
    }
  }
`;

export const QUERY_COMMENTS = gql`
  {
    comments {
      _id
      author {
        _id
        firstName
        lastName
      }
      commentText
      createdAt
      likes
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

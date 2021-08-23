import gql from 'graphql-tag';

export const QUERY_GAMES = gql`
  query getGames($genre: ID) {
    games(genre: $genre) {
      _id
      name
      description
      price
      image
      genre {
        _id
      }
    }
  }
`;

export const QUERY_ALL_GENRE = gql`
  {
    games {
      _id
      name
      description
      price
      genre {
        name
      }
    }
  }
`;

export const QUERY_GENRE = gql`
{
  genre {
    _id
    name
  }
}
`;

export const GET_ME = gql`
  {
    me {
      _id
      email
      username
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;
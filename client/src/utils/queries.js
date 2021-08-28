import gql from 'graphql-tag'

export const QUERY_GAMES = gql`
  query getGames($genre: ID) {
    games(genre: $genre) {
      id
      name
      description
      price
      image
      genre {
        id
      }
    }
  }
`

export const QUERY_ALL_GENRE = gql`
  {
    games {
      id
      name
      description
      price
      genre {
        name
      }
    }
  }
`

export const QUERY_GENRE = gql`
{
  genre {
    id
    name
  }
}
`

export const GET_ME = gql`
  {
    me {
      id
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
`

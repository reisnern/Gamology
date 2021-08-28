import {
  UPDATE_GAMES,
  UPDATE_GENRE,
  UPDATE_CURRENT_GENRE
} from './actions'

const defaultState = {
  genre: [],
  currentGenre: ''
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_GAMES:
      return {
        ...state,
        games: [...action.games]
      }

    case UPDATE_GENRE:
      return {
        ...state,
        genre: [...action.genre]
      }

    case UPDATE_CURRENT_GENRE:
      return {
        ...state,
        currentGenre: action.currentGenre
      }

    default:
      return state
  }
}

export default reducer

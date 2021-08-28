import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from '@apollo/react-hooks'

import Game from '../Game'
import { idbPromise } from '../../utils/helpers'
import beanEater from '../../assets/beanEater.gif'

import { QUERY_GAMES } from '../../utils/queries'
import { UPDATE_GAMES } from '../../utils/actions'

function Games () {
  const state = useSelector((state) => {
    return state
  })
  const dispatch = useDispatch()
  const { currentGenre } = state
  const { loading, data } = useQuery(QUERY_GAMES)
  const games = data?.games || []

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_GAMES,
        games: data.games
      })
      data.games.forEach((game) => {
        idbPromise('games', 'put', game)
      })
    } else if (!loading) {
      idbPromise('games', 'get').then((games) => {
        dispatch({
          type: UPDATE_GAMES,
          games: games
        })
      })
    }
  },
  [data, loading, dispatch])

  function filterGames () {
    if (!currentGenre) {
      return state.games
    }
    return state.games.filter(game => game.genre._id === currentGenre)
  }

  return (
      <div>
        {games.length
          ? (
          <div>
              {filterGames().map(game => (
                  <Game
                    key= {game._id}
                    _id={game._id}
                    image={game.image}
                    name={game.name}
                    price={game.price}
                  />
              ))}
          </div>
            )
          : (
          <h3>No Games? Maybe you should make one!</h3>
            )}
        { loading ? <img src={beanEater} alt="loading" /> : null }
      </div>
  )
}

export default Games

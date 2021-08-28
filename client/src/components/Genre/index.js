import React, { useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useDispatch, useSelector } from 'react-redux'

import { idbPromise } from '../../utils/helpers'
import { QUERY_GENRE } from '../../utils/queries'
import { UPDATE_GENRE, UPDATE_CURRENT_GENRE } from '../../utils/actions'

function Genre () {
  const state = useSelector((state) => {
    return state
  })
  const dispatch = useDispatch()

  const { genre } = state
  const { loading, data: genreData } = useQuery(QUERY_GENRE)

  useEffect(() => {
    if (genreData) {
      dispatch({
        type: UPDATE_GENRE,
        genre: genreData.genre
      })

      genreData.genre.forEach(genre => {
        idbPromise('genre', 'put', genre)
      })
    } else if (!loading) {
      idbPromise('genre', 'get').then(genre => {
        dispatch({
          type: UPDATE_GENRE,
          genre: genre
        })
      })
    }
  }, [genreData, loading, dispatch])

  const handleClick = id => {
    dispatch({
      type: UPDATE_CURRENT_GENRE,
      currentGenre: id
    })
  }

  return (
    <div>
      <h2>Genres</h2>
      {genre.map(item => (
        <button
          key={item.id}
          onClick={() => {
            handleClick(item.id)
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  )
}

export default Genre

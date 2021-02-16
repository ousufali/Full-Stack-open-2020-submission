import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK, ALL_BOOKS } from '../queries'

const NewBook = (props) => {
  const [Title, setTitle] = useState('')
  const [Author, setAuhtor] = useState('')
  const [PublishedString, setPublished] = useState('')
  const [Genre, setGenre] = useState('')
  const [Genres, setGenres] = useState([])


  const [addNewBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }],

    onError: (error) => console.log(error)

  })

  if (!props.show) {
    return null
  }


  const submit = async (event) => {
    event.preventDefault()
    const Published = Number(PublishedString)
    // console.log('add book...')
    console.log(typeof (Published), "published")

    addNewBook({ variables: { Title, Author, Published, Genres } })

    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(Genres.concat(Genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={Title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={Author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={PublishedString}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={Genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {Genres.join(', ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook
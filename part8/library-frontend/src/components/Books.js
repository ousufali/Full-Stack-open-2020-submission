import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Books = (props) => {

  const queryResult = useQuery(ALL_BOOKS)
  const meQuery = useQuery(ME)
  const [genre, setGenre] = useState("allgenre")

  const changeGenre = (bookGenre) => {
    setGenre(bookGenre)
  }


  if (!props.show) {
    return null
  }
  if (queryResult.loading) {
    return null
  }
  if (queryResult.data === undefined) {
    return (
      <h3>not found books from DB {queryResult.data}</h3>
    )
  }
  if (props.show === "recommend") {

    if (meQuery.loading) {
      return (<></>)
    }

    // console.log(meQuery)
    if (!meQuery.data.me.favoriteGenre) {
      return (
        <h3>You have no favorite genre</h3>
      )
    }
    return (
      <div>
        <h2>recommendations</h2>
        <p>books in your favorite genre <b>{meQuery.data.me.favoriteGenre}</b></p>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                author
              </th>
              <th>
                published
              </th>
            </tr>

            {queryResult.data.allBooks.map(book => {
              // console.log(meQuery.data.me.favoriteGenre, " : me genre")
              // console.log("single book :  ", book)
              if (book.genres !== undefined && book.genres.includes(meQuery.data.me.favoriteGenre)) {
                return (
                  <tr key={book.title}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.published}</td>
                  </tr>
                )
              }
            }

            )}
          </tbody>
        </table>
      </div>
    )

  } else

    if (props.show === "books") {
      return (
        <div>
          <h2>books</h2>
          <h4>In genre {genre}</h4>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>
                  author
            </th>
                <th>
                  published
            </th>
              </tr>

              {queryResult.data.allBooks.map(book => {
                // console.log(book.genres)
                if (genre === "allgenre") {
                  return (
                    <tr key={book.title}>
                      <td>{book.title}</td>
                      <td>{book.author ? book.author.name : ''}</td>
                      <td>{book.published}</td>
                    </tr>
                  )
                } else
                  if (book.genres && book.genres.includes(genre)) {
                    return (
                      <tr key={book.title}>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.published}</td>
                      </tr>
                    )
                  }
              }

              )}
              <tr>
                <td>
                  <button onClick={() => changeGenre("refactoring")}>refactoring</button>
                  <button onClick={() => changeGenre("classic")}>classic</button>
                  <button onClick={() => changeGenre("crime")}>crime</button>
                  <button onClick={() => changeGenre("design")}>design</button>
                  <button onClick={() => changeGenre("patterns")}>patterns</button>
                  <button onClick={() => changeGenre("agile")}>agile</button>
                  <button onClick={() => changeGenre("allgenre")}>allgenre</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )
    }
  return (<></>)
}

export default Books
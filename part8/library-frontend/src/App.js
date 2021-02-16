
import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'

import { ALL_BOOKS, BOOK_ADDED } from './queries'
import { useSubscription, useApolloClient } from '@apollo/client'



const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const updateCache = (addedBook) => {
    const isBookIncluded = (books, book) => books.map(b => b.id).includes(book.id)

    const storeData = client.readQuery({ query: ALL_BOOKS })

    if (!isBookIncluded(storeData.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: storeData.allBooks.concat(addedBook) }
      })
    }

  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log('added book', subscriptionData.data.bookAdded)
      window.alert(`${subscriptionData.data.bookAdded.title} book added`)
      updateCache(subscriptionData.data.bookAdded)
    }
  })


  useEffect(() => {
    const tokenFrom_localStorage = localStorage.getItem("auther-user-token")
    if (tokenFrom_localStorage) {
      setToken(tokenFrom_localStorage)
    }
  }, [])

  const logout = () => {
    setToken(null)
    localStorage.removeItem("auther-user-token")
  }


  if (!token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage("login")}>login</button>
        </div>

        <Authors
          show={page === 'authors'}
        />

        <Books
          show={page}
        />

        <LoginForm show={page === "login"} setToken={setToken} setPage={setPage} />

      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage("recommend")}>recommend</button>
        <button onClick={() => logout()} >logout</button>

      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page}
      />

      <NewBook
        show={page === 'add'} updateCache={updateCache}
      />

    </div>
  )




}

export default App
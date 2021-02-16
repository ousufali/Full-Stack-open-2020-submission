import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_BIRTH } from '../queries'
import Select from 'react-select'


const Authors = (props) => {

  const queryResult = useQuery(ALL_AUTHORS)
  const [selectName, setSelectName] = useState(null)
  const [birth, setBirth] = useState('')

  const [editAuthor] = useMutation(UPDATE_BIRTH, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => console.log(error.message)
  })

  if (!props.show) {
    return null
  }

  if (queryResult.loading) {
    return null
  }
  if (queryResult.data === undefined) {
    return (
      <h3>not found author from DB {queryResult.data}</h3>
    )
  }

  const updateBirth = (event) => {
    event.preventDefault()

    const born = parseInt(birth)
    const name = selectName.value
    console.log("select name:", selectName)

    editAuthor({ variables: { name, born } })
    // setName('')
    setBirth('')

  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {queryResult.data.allAuthors.map(author =>
            <tr key={author.name}>
              <td>{author.name}</td>
              <td>{author.born}</td>
              <td>{author.bookCount}</td>

            </tr>
          )}
        </tbody>
      </table>

      <div>
        <form onSubmit={updateBirth}>
          <h2>Set birthyear</h2>
          {/* <div>name <input value={name} onChange={({ target }) => setName(target.value)} /></div> */}
          <div>
            <Select
              defaultValue={selectName}
              onChange={setSelectName}
              options={queryResult.data.allAuthors.map((author) => { return { value: author.name, label: author.name } })}
            />
          </div>
          <div>birth<input value={birth} onChange={({ target }) => setBirth(target.value)} type={"number"} /></div>
          <div>  <button type={"submit"} >update author</button></div>
        </form>
      </div>
    </div>
  )
}

export default Authors

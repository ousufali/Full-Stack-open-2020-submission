import React, { useState } from 'react'
import { useField } from '../hooks'


const AnecdoteForm = (props) => {
    // const [content, setContent] = useState('')
    // const [author, setAuthor] = useState('')
    // const [info, setInfo] = useState('')
    const content = useField('text')
    const author = useField('text')
    const info = useField('text')
    // debugger;


    const handleSubmit = (e) => {
        e.preventDefault()
        props.addNew({
            content,
            author,
            info,
            votes: 0
        })
        // setAuthor('')
        // setContent('')
        // setInfo('')
    }
    const clearField = () => {
        content.clear()
        author.clear()
        info.clear()
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
            {/* <input name='content' value={content} onChange={(e) => setContent(e.target.value)} /> */}
                    <input type={content.type} value={content.value} onChange={content.onChange} />

                </div>
                <div>
                    author
            {/* <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} /> */}
                    {/* <input {...author} /> */}
                    <input type={author.type} value={author.value} onChange={author.onChange} />

                </div>
                <div>
                    url for more info
            {/* <input name='info' value={info} onChange={(e) => setInfo(e.target.value)} /> */}
                    {/* <input {...info} /> */}
                    <input type={info.type} value={info.value} onChange={info.onChange} />

                </div>
                <button>create</button>
                <button onClick={clearField}>reset</button>
            </form>
        </div>
    )

}
export default AnecdoteForm
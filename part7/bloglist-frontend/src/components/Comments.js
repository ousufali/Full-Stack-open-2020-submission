import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateComment } from '../reducers/blogReducer'



const Comments = ({ blog }) => {
    const [comment, setComment] = useState("")
    const dispatch = useDispatch()

    const addComment = (event) => {
        event.preventDefault()
        // console.log("comment:   ", comment)
        dispatch(updateComment(comment, blog))

    }
    const handleChange = (event) => {
        console.log(event.target.value)
        setComment(event.target.value)

    }

    return (
        <div>
            <div><h3>Comments</h3></div>
            <div>
                <form onSubmit={addComment}>
                    <input type="text" name="commentField" placeholder="write comment" onChange={handleChange} />
                    <input type="submit" name="submit" value="add comment" />
                </form>
            </div>
            <div>
                <ul>
                    {blog.comments.map((comment, index) => {
                        console.log(index)
                        return <li key={index}>{comment}</li>
                    })}

                </ul>
            </div>

        </div>
    )
}

export default Comments

import React, { useState } from 'react'
// import BlogServices from '../services/blogs'
import Comments from './Comments'
import { updateLike, removeBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'


const Blog = () => {
  const blogId = useParams().id
  const blog = (useSelector(state => state.Blogs)).find((blog => blog.id === blogId))

  // console.log("blog:.....:", blogId, "...................")
  // console.log("blog:........................")
  console.log("blog:.....:", blog, "...................")
  // console.log("user:.....:",user,"...................")
  // console.log("user:........................")

  // const [showDetails, setShowDetails] = useState(false)

  const dispatch = useDispatch()



  // const toggdetails = () => setShowDetails(!showDetails)


  const UpdateLike = async () => {
    // console.log("like clicked","id=",blog.id)
    dispatch(updateLike(blog.id))
  }

  // const deleteBlog = async () => {
  //   const condition = window.confirm(`Remove blog '${blog.title}'`)
  //   if (condition) {
  //     dispatch(removeBlog(blog.id))
  //   }
  // }




  if (blog === undefined) {
    return null
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <em><a href={blog.url}>{blog.url}</a></em>
      <p>{blog.likes} likes <button onClick={UpdateLike}>like</button></p>
      <p>added by {blog.user.name}</p>
      <Comments blog={blog} />
    </div>
  )
}

export default Blog

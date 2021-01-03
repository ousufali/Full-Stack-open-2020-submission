import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { createNewBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'


// import Blog from './Blog'
import Notification from './Notification'
import Blogform from './Blogform'
import Togglable from './Togglable'



const BlogList = () => {

    const Blogs = (useSelector(state => state.Blogs)).sort((a, b) => b.likes - a.likes)
    const blogFormRef = useRef()
    const user = useSelector(state => state.User)
    const dispatch = useDispatch()


    const addBlog = async (blogObject) => {

        dispatch(createNewBlog(blogObject, user))

        blogFormRef.current.toggleVisibility()
        const message = `a new blog '${blogObject.title}' by ${blogObject.author} added.`
        dispatch(setNotification(message, 5))

    }



    const blogstyle = {
        border: 'solid',
        borderWidth: 2,
        paddingTop: 10,
        paddingLeft: 2,
        marginBottom: 5

    }

    return (
        <div>
            
            <div>
                <Notification ></Notification>
            </div>
            {/* <div>
                <p>{user.name} logged in {<button type="submit" onClick={logout} name="logout" >logout</button>}</p>

            </div> */}

            <Togglable buttonLable={"create new"} ref={blogFormRef}>
                <Blogform createBlog={addBlog} />
            </Togglable>

            <h2>Blogs</h2>
            <div>
                {Blogs.map(blog =>
                    <div style={blogstyle} key={blog.id}><Link to={`/blogs/${blog.id}`}> {blog.title}</Link></div>
                )}
            </div>
        </div>
    )
}

export default BlogList
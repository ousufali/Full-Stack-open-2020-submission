import blogServics from '../services/blogs'

const blogReducer = (state = [], action) => {

    switch (action.type) {
        case 'INIT_STATE':
            return action.data
        case 'CREATE_NEW':
            return [...state, action.data]
        case 'UPDATE_LIKE':
            const updatedBlog = action.data
            const newLikedBlogs = state.map((blog) => updatedBlog.id === blog.id ? updatedBlog : blog)
            return newLikedBlogs
        case 'DELETE_BLOG':
            const remainedBlog = state.filter((blog) => action.id !== blog.id)
            console.log("Rem", remainedBlog)
            return remainedBlog
        case 'UPDATE_COMMENT':
            const newCommentedBlogs = state.map((blog) => action.data.id === blog.id ? action.data : blog)
            return newCommentedBlogs


        default:
            return state
    }
}


export const initalizeBlogState = () => {
    return async dispatch => {
        const blogs = await blogServics.getAll()
        dispatch({
            type: 'INIT_STATE',
            data: blogs
        })
    }
}
export const createNewBlog = (Blog, user) => {

    return async dispatch => {
        const blog = await blogServics.create(Blog)
        const newBlog = { ...blog, user }
        dispatch({
            type: 'CREATE_NEW',
            data: newBlog
        })
    }
}

export const updateLike = (id) => {
    return async dispatch => {
        console.log("updating....")
        const blogForUpdation = (await blogServics.getAll()).find((x) => x.id === id)
        const updatedBlog = {
            // title: blogForUpdation.title,
            // author: blogForUpdation.author,
            // url: blogForUpdation.url,
            likes: blogForUpdation.likes + 1
        }
        console.log("to ", blogForUpdation)
        console.log("updated:", updatedBlog)

        const newBlog = await blogServics.update(updatedBlog, id)
        console.log("from  db:", newBlog)

        dispatch({
            type: 'UPDATE_LIKE',
            data: newBlog
        })
    }
}
export const updateComment = (comment , blog) => {
    return async dispatch => {
        // console.log("updating....")
        // const blogForUpdation = (await blogServics.getAll()).find((x) => x.id === id)
        const commentedBlog = {
            comments: [...blog.comments, comment]
        }
        // console.log("to ", blogForUpdation)
        // console.log("updated:", updatedBlog)

        const newBlog = await blogServics.update(commentedBlog, blog.id)
        // console.log("from  db:", newBlog)

        dispatch({
            type: 'UPDATE_COMMENT',
            data: newBlog
        })
    }
}


export const removeBlog = (id) => {
    return async dispatch => {
        await blogServics.remove(id)
        dispatch({
            type: 'DELETE_BLOG',
            id: id
        })
    }
}
export default blogReducer
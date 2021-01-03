import { createStore, combineReducers, applyMiddleware } from 'redux'
import notificationReducer from './reducers/notificationReducer';
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
// import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const reducer = combineReducers(
    {
        Blogs: blogReducer,
        Notification: notificationReducer,
        User: userReducer
    }

)

const store = createStore(
    reducer,
    applyMiddleware(thunk)

)


export default store
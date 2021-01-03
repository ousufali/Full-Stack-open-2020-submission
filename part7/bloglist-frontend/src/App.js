import React, { useEffect } from 'react'
import blogService from './services/blogs'

import BlogList from './components/BlogList'
import Blog from './components/Blog'
import LogIn from './components/LogIn'
import Users from './components/Users'
import User from './components/User';

import { useDispatch, useSelector } from 'react-redux'
import { initalizeBlogState } from './reducers/blogReducer'
import { setUser, removeUser } from './reducers/userReducer'


import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'

import styled from 'styled-components'
import './App.css'

const Navigation = styled.div``
const Page = styled.div``


const App = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.User)



  useEffect(() => {

    dispatch(initalizeBlogState())
  }, [dispatch])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('LoggedInUser')
    if (loggedInUser) {
      const userjson = JSON.parse(loggedInUser)
      dispatch(setUser(userjson))
      blogService.setToken(userjson.token)
    }
  }, [dispatch])

  const logout = () => {
    const loggedInUser = JSON.parse(window.localStorage.getItem('LoggedInUser'))
    window.localStorage.removeItem('LoggedInUser')
    dispatch(removeUser(loggedInUser.id))
  }


  const padding = {
    padding: 5
  }


  return (
    <Page className="Page">
      <BrowserRouter>
        <Navigation className="Navigation">
          <div>
            <Link style={padding} to="/" >home</Link>
            <Link style={padding} to="/users">users</Link>
            {user ? <em> <b>{user.name}</b> logged in {<button type="submit" onClick={logout} name="logout" >logout</button>} </em> : ''}

          </div>
        </Navigation>
        <h2>Blog App</h2>

        <Switch>
          <Route exact path="/users/:id" render={() => { return user ? <User /> : <LogIn /> }}>
          </Route>
          <Route exact path="/blogs/:id" render={() => { return user ? <Blog /> : <LogIn /> }}>
          </Route>
          <Route exact path="/users" render={
            () => user ? <Users /> : <LogIn />
          } />


          <Route path="/" render={() => {
            return (user ? <BlogList /> : <LogIn />)
          }} />

        </Switch>

      </BrowserRouter>
    </Page>
  )

}

export default App
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { setContext } from 'apollo-link-context'
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'


const httpLink = new HttpLink({
    uri: 'http://localhost:4000'
})
const websocketLink = new WebSocketLink({
    uri: `ws://localhost:4000/graphql`,
    options: {
      reconnect: true
    }
  })



const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("auther-user-token")
    return {
        headers: {
            ...headers,
            authorization: token ? `bearer ${token}` : null
        }
    }
})

const splitLink = split(
    ({ query }) => {
        const defnitions = getMainDefinition(query)
        return (
            defnitions.kind === 'OperationDefinition' && defnitions.operation === 'subscription'
        );
    },
    websocketLink,
    authLink.concat(httpLink)
)

const client = new ApolloClient(
    {
        cache: new InMemoryCache(),
        link: splitLink
    }
)

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
)
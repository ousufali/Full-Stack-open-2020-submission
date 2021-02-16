import { gql } from '@apollo/client'

export const BOOK_ADDED = gql`
subscription {
    bookAdded {
        title
        genres
        published
    }
  }

`

export const LOGIN = gql`
mutation login($username: String! , $password: String! ) {
   login(username:$username , password: $password){
       value
   }
}
`

export const ME = gql`
query{
    me{
        username
        favoriteGenre
        
    }
}
`


export const ALL_AUTHORS = gql`
query{
    allAuthors{
        name
        born
        bookCount
    }
}
`

export const ALL_BOOKS = gql`
query{
    allBooks{
        title
        genres
        published
    }
}
`



export const ADD_BOOK = gql`
mutation addNewBook($Title: String! , $Author: String! , $Published: Int! , $Genres: [String!]) {
    addBook(
        title : $Title,
        author: $Author,
        published: $Published,
        genres: $Genres
        ){
            title
            published
        }
       
}
`

export const UPDATE_BIRTH = gql`
mutation updateBirth($name : String! , $born : Int!){
    updateAuthor(name : $name , setBornTo : $born){
        name
        born
    }
    
}
`
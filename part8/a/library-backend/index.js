const { ApolloServer, gql } = require('apollo-server')

let authors = [
    {
        name: 'Robert Martin',
        id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
        born: 1952,
    },
    {
        name: 'Martin Fowler',
        id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
        born: 1963
    },
    {
        name: 'Fyodor Dostoevsky',
        id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
        born: 1821
    },
    {
        name: 'Joshua Kerievsky', // birthyear not known
        id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
    },
    {
        name: 'Sandi Metz', // birthyear not known
        id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
    },
]

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
*/

let books = [
    {
        title: 'Clean Code',
        published: 2008,
        author: 'Robert Martin',
        id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Agile software development',
        published: 2002,
        author: 'Robert Martin',
        id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
        genres: ['agile', 'patterns', 'design']
    },
    {
        title: 'Refactoring, edition 2',
        published: 2018,
        author: 'Martin Fowler',
        id: "afa5de00-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Refactoring to patterns',
        published: 2008,
        author: 'Joshua Kerievsky',
        id: "afa5de01-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'patterns']
    },
    {
        title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
        published: 2012,
        author: 'Sandi Metz',
        id: "afa5de02-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'design']
    },
    {
        title: 'Crime and punishment',
        published: 1866,
        author: 'Fyodor Dostoevsky',
        id: "afa5de03-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'crime']
    },
    {
        title: 'The Demon ',
        published: 1872,
        author: 'Fyodor Dostoevsky',
        id: "afa5de04-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'revolution']
    },
]

const typeDefs = gql`
  type Query {
    bookCount: Int!
    authorCount : Int!
    allBooks(author : String, genre : String) : [Book]
    allAuthors : [Author]!


  }

  type Author {
    name : String!
    born : Int
    bookCount : Int
    id: ID!
  }

  type Book {
    title : String!
    author : String!
    published : Int!
    genres : [String!]!
    id : ID!
    
  }

  type Mutation {
    addBook(title : String! , author: String!, published : Int! , genres : [String!]): Book!
    updateAuthor(name : String! , setBornTo : Int! ) : Author
    
   
  }
`

const resolvers = {
    Author: {
        bookCount: (root) => {
            const count = books.reduce((acum, book) => {
                if (book.author === root.name) {
                    return acum + 1
                }
                return acum
            }, 0)
            return count
        }
    },
    Query: {
        bookCount: () => books.length,

        authorCount: () => authors.length,
        allBooks: (root, args) => {
            if (!args.author && !args.genre) {
                return books
            }
            if (!args.author && args.genre) {
                const genreBooks = books.filter((book) => book.genres.includes(args.genre))
                return genreBooks
            } if (args.author && !args.genre) {
                const authorsBooks = books.filter((book) => book.author === args.author)
                return authorsBooks
            }
            const genreAuthorBooks = books.filter((book) => book.author === args.author && book.genres.includes(args.genre))
            // console.log(args.author)
            return genreAuthorBooks

        },

        allAuthors: () => authors

    },
    Mutation:
    {
        addBook: (root, args) => {
            const newBook = {
                title: args.title,
                published: args.published,
                author: args.author,
                id: () => books.length + 1,
                genres: args.genre
            }

            const author = authors.find((author) => author.name === newBook.author)
            if (!author) {
                const newAuthor = {
                    name: newBook.author,
                    id: authors.length + 1
                }
                authors = authors.concat(newAuthor)
            }
            books = books.concat(newBook)

            return newBook
        },
        updateAuthor: (root, args) => {
            const author = authors.find(author => author.name === args.name)
            if (!author) {
                return null
            }
            const updatedAuthor = { ...author, born: args.setBornTo }
            authors = authors.map(author => author.name === updatedAuthor.name ? updatedAuthor : author)
            
            return updatedAuthor

        },


    }

}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})
const { ApolloServer, gql, UserInputError, AuthenticationError, PubSub } = require('apollo-server')
const mongoose = require('mongoose')
const Lodash = require('lodash')
const jwt = require('jsonwebtoken')

const Book = require('./models/Book')
const Author = require('./models/Author')
const User = require('./models/User')

const JWT_SECRET = "0010201as01d0201"
const MONGODB_URI = 'mongodb+srv://fullstack:halfstack@cluster0-ostce.mongodb.net/graphql?retryWrites=true'



const pubsub = new PubSub()
console.log("Connecting to ", MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
        console.log("connectd to DB")
    })
    .catch((error) => {
        console.log("connection failed", error)

    })
const typeDefs = gql`
    type User {
        username : String!
        favoriteGenre: String!
        id: ID!

    }
    type Token {
        value: String!
      }

  type Query {
    bookCount: Int!
    authorCount : Int!
    allBooks(author : String, genre : String) : [Book]
    allAuthors : [Author]!
    removeAll : Int
    me: User

  }

  type Author {
    name : String!
    born : Int
    bookCount : Int
    id: ID!
  }

  type Book {
    title : String!
    author : Author!
    published : Int!
    genres : [String!]!
    id : ID!
    
  }

  type Mutation {
    addBook(title : String! , author: String!, published : Int! , genres : [String!]): Book!
    updateAuthor(name : String! , setBornTo : Int! ) : Author
    createUser(
        username : String!
        favoriteGenre : String!
    ): User
    login(
        username: String!
        password : String!
    ):Token
   
  }
  type Subscription {
      bookAdded : Book!
  }
`

const resolvers = {

    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"])
        },
    },
    Author: {
        bookCount: async ({ id }) => {
            const books = await Book.find({})
            const IDs = books.map((book) => book.author)
            // console.log("books ids from map", IDs)
            const IDscount = Lodash.countBy(IDs, (id) => id)
            // console.log("Idscount from _countBy", IDscount)

            return IDscount[id] || 0
        }

    },
    Query: {
        bookCount: () => Book.collection.countDocuments(),

        authorCount: () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {

            // if (!args.author && !args.genre) {
            //     return books
            // }
            // if (!args.author && args.genre) {
            //     const genreBooks = books.filter((book) => book.genres.includes(args.genre))
            //     return genreBooks
            // } if (args.author && !args.genre) {
            //     const authorsBooks = books.filter((book) => book.author === args.author)
            //     return authorsBooks
            // }
            // const genreAuthorBooks = books.filter((book) => book.author === args.author && book.genres.includes(args.genre))
            // return genreAuthorBooks
            const books = await Book.find({})
            // console.log(books[0]);
            // return Book.find({})
            return books
        },

        allAuthors: () => Author.find({}),
        me: (root, args, context) => {
            console.log(context.loginUser, "meeeeeee")
            return context.loginUser
        }

    },
    Mutation:
    {
        addBook: async (root, args, { loginUser }) => {

            if (!loginUser) {
                throw new AuthenticationError("user not authenticated")
            }

            let bookAuthor = await Author.findOne({ name: args.author })
            console.log("//////////book author////////////")
            console.log(bookAuthor)
            console.log("//////////book author////////////")

            if (!bookAuthor) {
                console.log("creting new author")
                bookAuthor = new Author({ name: args.author })
                try {
                    await bookAuthor.save()
                } catch (e) {
                    throw new UserInputError("author not exist, author failed.", {
                        invalidArgs: { nameAuthor: args.author }
                    })
                }
            }

            const newBook = new Book({
                title: args.title,
                published: args.published,
                author: bookAuthor._id,
                genres: args.genres,
            });

            console.log("newBook", newBook)
            try {
                const newAddedBook = (await newBook.save()).populate("author")
                pubsub.publish('BOOK_ADDED', { bookAdded: newAddedBook })

                return newAddedBook

            } catch (e) {
                throw new Error("book addition failed due to, : error::", {
                    invalidArgs: e.message
                })
            }



        },
        updateAuthor: async (root, args, { loginUser }) => {
            if (!loginUser) {
                throw new AuthenticationError("user not authenticated")
            }
            const author = await Author.findOne({ name: args.name })
            author.born = args.setBornTo
            return author.save()

            // const author = authors.find(author => author.name === args.name)
            // if (!author) {
            //     return null
            // }
            // const updatedAuthor = { ...author, born: args.setBornTo }
            // authors = authors.map(author => author.name === updatedAuthor.name ? updatedAuthor : author)

            // return updatedAuthor

        },
        createUser: (root, args) => {
            console.log("...args:", { ...args })
            const newUser = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
            console.log("user data: ", newUser)



            return newUser.save().catch((error) => {
                throw new UserInputError(`user creation failed with Error: ${error.message} `, {
                    invalidArgs: args.username
                })
            })
        },
        login: async (root, args) => {

            const newUser = await User.findOne({ username: args.username })

            if (!newUser || args.password !== "secred") {
                throw new UserInputError("wrong credentials, login failed", {
                    invalidArgs: args.username
                })
            }
            const UserForToken = {
                username: args.username,
                id: newUser._id
            }

            return { value: jwt.sign(UserForToken, JWT_SECRET) }

        }


    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {

        const tokenString = req ? req.headers.authorization : null
        // console.log(tokenString,"token string")
        if (tokenString && tokenString.toLowerCase().startsWith("bearer ")) {
            const decodedToken = jwt.verify(tokenString.substring(7), JWT_SECRET)

            const loginUser = await User.findById(decodedToken.id)
            // console.log("login user:    ", loginUser)
            return { loginUser }

        }
    }
})

server.listen().then(({ url, subscriptionsUrl }) => {
    console.log(`Server ready at ${url}`)
    console.log(`Subcription ready at ${subscriptionsUrl}`)
})
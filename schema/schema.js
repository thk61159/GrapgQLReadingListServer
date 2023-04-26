const {
	graphql,
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = require('graphql')
// https://lodash.com
const _ = require('lodash')

const Book = require('../models/book')
const Author = require('../models/author')

const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
    genre: { type: GraphQLString },
		author: {
			type: AuthorType,
			resolve(parent, args) {
				// console.log(parent)
				return Author.findById(parent.authorId).catch(err => {
					console.log(err)
					return err
				})
			},
		},
	}),
})

const AuthorType = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				return Book.find({ authorId: parent.id }).catch(err => {
					console.log(err)
					return err
				})
			},
		},
	}),
})
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: () => ({
		book: {
			type: BookType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				//code to get data from db
				return Book.findById(args.id).catch(err => {
					console.log(err)
					return err
				})
			},
		},
		author: {
			type: AuthorType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Author.findById(args.id).catch(err => {
					console.log(err)
					return err
				})
			},
		},
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				return Book.find().catch(err => {
					console.log(err)
					return err
				})
			},
		},
		authors: {
			type: new GraphQLList(AuthorType),
			resolve(parent, args) {
				return Author.find().catch(err => {
					console.log(err)
					return err
				})
			},
		},
	}),
})

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addAuthor: {
			type: AuthorType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				age: { type: new GraphQLNonNull(GraphQLInt) },
			},
			resolve(parent, args) {
				const newAuthor = new Author({
					name: args.name,
					age: args.age,
				})

				const savedAuthor = newAuthor.save().catch(err => {
					console.log(err)
					return err
				})
				return savedAuthor
			},
		},
		addBook: {
			type: BookType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				genre: { type: new GraphQLNonNull(GraphQLString) },
				authorId: { type: new GraphQLNonNull(GraphQLID) },
			},
			resolve(parent, args) {
				const newBook = new Book({
					name: args.name,
					genre: args.genre,
					authorId: args.authorId,
				})

				const savedBook = newBook.save().catch(err => {
					console.log(err)
					return err
				})
				return savedBook
			},
		},
	},
})
module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation,
})

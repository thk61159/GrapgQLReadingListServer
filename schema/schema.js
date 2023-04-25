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
// const mongoose = require('mongoose')

const Book = require('../models/book')
const Author = require('../models/author')

const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
    genre: { type: GraphQLString },
    // authorId:{ type: GraphQLID },
		author: {
			type: AuthorType,
			resolve(parent, args) {
				// console.log(parent)
				return Author.findById(parent.authorId)
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
				return Book.find({ authorId: parent.id})
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
				return Book.findById(args.id)
			},
		},
		author: {
			type: AuthorType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Author.findById(args.id)
			},
		},
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				return Book.find()
			},
		},
		authors: {
			type: new GraphQLList(AuthorType),
			resolve(parent, args) {
				return Author.find()
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
				name: { type: GraphQLString },
				age: { type: GraphQLInt },
			},
			async resolve(parent, args) {
				const newAuthor = new Author({
					name: args.name,
					age: args.age,
				})

				try {
					const savedAuthor = await newAuthor.save()
					return savedAuthor
				} catch (error) {
					console.log('Error saving author:', error.message)
				}
			},
		},
		addBook: {
			type: BookType,
			args: {
				name: { type: GraphQLString },
				genre: { type: GraphQLString },
				authorId: { type: GraphQLID },
			},
      async resolve(parent, args) {
				const newBook = new Book({
					name: args.name,
					genre: args.genre,
					authorId: args.authorId,
				})

				try {
					const savedBook = await newBook.save()
					return savedBook
				} catch (error) {
					console.log('Error saving book:', error.message)
				}
			},
		},
	},
})
module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation,
})

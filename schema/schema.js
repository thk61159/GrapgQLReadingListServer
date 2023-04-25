const {
	graphql,
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
  GraphQLInt,
  GraphQLList
} = require('graphql')
// https://lodash.com
const _ = require('lodash')

const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		author: {
			type: AuthorType,
			resolve(parenr, args) {
				// console.log(parenr)
				return _.find(authors, { id: parenr.authorId })
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
			resolve(parenr, args) {
				return _.filter(books, { authorId: parenr.id })
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
			resolve(parenr, args) {
				//code to get data from db
				return _.find(books, { id: args.id })
			},
		},
		author: {
			type: AuthorType,
			args: { id: { type: GraphQLID } },
			resolve(parenr, args) {
				return _.find(authors, { id: args.id })
			},
		},
		books: {
			type: new GraphQLList(BookType),
			resolve(parenr, args) {
				return books
			},
		},
		authors: {
			type: new GraphQLList(AuthorType),
			resolve(parenr, args) {
				return authors
			},
		},
	}),
})

module.exports = new GraphQLSchema({
	query: RootQuery,
})

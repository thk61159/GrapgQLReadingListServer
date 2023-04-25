const dbconnect = require('../../config/mongoConnect')

const Book = require('../book')
const Author = require('../author')

// dummy data
const books = [
	{ name: 'Name of the Wind', genre: 'Fantasy'},
	{ name: 'The Final Empire', genre: 'Fantasy' },
	{ name: 'The Long Earth', genre: 'Sci-Fi'},
	{ name: 'The Hero of Ages', genre: 'Fantasy' },
	{ name: 'The Colour of Magic', genre: 'Fantasy' },
	{ name: 'The Light Fantastic', genre: 'Fantasy' },
]

const authors = [
	{ name: 'Patrick Rothfuss', age: 44, },
	{ name: 'Brandon Sanderson', age: 42,},
	{ name: 'Terry Pratchett', age: 66, },
]
function RandomInt(rang) {
  return Math.floor(Math.random() * rang)
}

dbconnect.once('open', async () => {
  const Authors = await Author.insertMany(authors)
  for (let e of books) { 
    Book.create({ ...e, authorId:Authors[RandomInt(Authors.length)]._id })
  }
  
})
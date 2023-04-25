const mongoose = require('mongoose')
const bookSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	genre: {
		type: String,
		required: true,
	},
	authorId: {
		type: mongoose.Schema.Types.ObjectID,
		ref: 'Author',
		index: true,
		required: true,
	},
})

module.exports = mongoose.model('Book', bookSchema)

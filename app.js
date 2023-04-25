const express = require('express')
const { graphqlHTTP } = require('express-graphql')

const schema = require('./schema/schema')

const app = express()

app.get('/', (req, res) => {

  res.send('<a href="/graphql">built server</a> <p>test nodemon</p>')
})
app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		graphiql: true, //using query gui
	})
)
app.listen(process.env.PORT || 3000, () => {
  console.log('node server is running')
})
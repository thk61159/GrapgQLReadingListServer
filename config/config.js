const MONGO_IP = process.env.MONGO_IP || 'mongo'
const MONGO_PORT = process.env.MONGO_PORT || 27017
const MONGO_USER = process.env.MONGO_USER
const MONGO_PASSWORD = process.env.MONGO_PASSWORD
// const REDIS_URL = process.env.REDIS_URL || 'redis'
// const REDIS_PORT = process.env.REDIS_PORT || 6379
// const SESSION_SECRET = process.env.SESSION_SECRET

const MONGO_URL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/graphql?authSource=admin`

module.exports = {
	MONGO_IP,
	MONGO_PORT,
	MONGO_USER,
	MONGO_PASSWORD,
	MONGO_URL,
}

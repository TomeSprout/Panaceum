import { connect as MongoDBConnection } from 'mongoose'

const databaseConnection = async () => {
  try {
    await MongoDBConnection(process.env.MONGODB_DATABASE_URI as string)
  } catch (error) {
    console.log(error)
  }
}

export { databaseConnection }

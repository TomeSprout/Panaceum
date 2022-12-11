import { connect as MongoDBConnection } from 'mongoose'

const connectDB = async () => {
  try {
    await MongoDBConnection(process.env.DATABASE_URI as string)
  } catch (error) {
    console.log(error)
  }
}

export { connectDB }
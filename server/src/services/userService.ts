import { DocumentDefinition } from 'mongoose'
import User, { UserSchema } from '../models/User'

export const login = async (user: DocumentDefinition<UserSchema>) => {
  try {
    const foundUser = await User.findOne({ email: user.email, password: user.password })
  } catch (error) {
    throw error
  }
}
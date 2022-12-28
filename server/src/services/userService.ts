import { DocumentDefinition } from 'mongoose'
import User, { UserSchema } from '../models/User.model'

export const register = async (user: DocumentDefinition<UserSchema>) => {
  try {
    User.create(user)
  } catch (error) {
    throw error
  }
}

export const login = async (user: DocumentDefinition<UserSchema>) => {
  try {
    const foundUser = await User.findOne({
      email: user.email,
      password: user.password,
    })
  } catch (error) {
    throw error
  }
}

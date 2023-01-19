import { DocumentDefinition } from 'mongoose'

import User, { UserSchema } from '../models/User.model'

const createSecret = async (user: DocumentDefinition<UserSchema>) => {
  try {
    const foundUser = await User.findOne({ email: user.email }).exec()

    if (!foundUser) {
      throw new Error('Email is incorrect')
    }

    const duplicate = await User.find({
      'secrets.secret': user.secrets,
    })

    if (duplicate) {
      throw new Error('Provided API Key already saved')
    }
    foundUser?.secrets.push(user.secrets[0])
    await foundUser.save()

    return 'Secret created'
  } catch (error) {
    throw error
  }
}

export { createSecret }

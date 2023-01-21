import bcrypt from 'bcrypt'
import { DocumentDefinition } from 'mongoose'

import User, { APISecret, UserSchema } from '../models/User.model'

const createSecret = async (user: DocumentDefinition<UserSchema>) => {
  try {
    const foundUser = await User.findOne({ email: user.email }).exec()

    if (!foundUser) {
      throw new Error('Email is incorrect')
    }

    const { description, label, secret } = user.secrets[0]
    const secretSaltRounds: number = 8

    foundUser.secrets.map((secretObject: APISecret) => {
      const secretMatch = bcrypt.compareSync(secret, secretObject.secret)
      if (secretMatch) {
        throw new Error('Duplicate - Provided API Key already saved')
      }
    })

    const hashedSecret = await bcrypt.hash(secret, secretSaltRounds)

    foundUser?.secrets.push({
      description: description,
      label: label,
      secret: hashedSecret,
    })
    await foundUser.save()

    return 'New secret created'
  } catch (error) {
    throw error
  }
}

export { createSecret }

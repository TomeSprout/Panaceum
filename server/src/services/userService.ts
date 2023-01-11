import bcrypt from 'bcrypt'
import { Secret, sign } from 'jsonwebtoken'
import { DocumentDefinition } from 'mongoose'

import User, { UserSchema } from '../models/User.model'

const register = async (user: DocumentDefinition<UserSchema>) => {
  try {
    const duplicate = await User.findOne({ email: user.email }).lean().exec()

    if (duplicate) {
      return 'Duplicate'
    }
    User.create(user)
  } catch (error) {
    throw error
  }
}

const login = async (user: DocumentDefinition<UserSchema>) => {
  try {
    const foundUser = await User.findOne({
      email: user.email,
    })

    if (!foundUser) {
      throw new Error('Email is incorrect')
    }

    const passwordMatch = bcrypt.compareSync(user.password, foundUser.password)
    if (passwordMatch) {
      const accessToken = sign(
        {
          _id: foundUser._id?.toString(),
          email: foundUser.email,
        },
        process.env.ACCESS_TOKEN_SECRET as Secret,
        {
          expiresIn: '5m',
        }
      )

      const refreshToken = sign(
        {
          email: foundUser.email,
        },
        process.env.REFRESH_TOKEN_SECRET as Secret,
        {
          expiresIn: `1d`,
        }
      )
      
      return {
        user: {
          _id: user._id,
          email: user.email,
          username: user.username
        },
        accessToken: accessToken,
        refreshToken: refreshToken,
      }
    } else {
      throw new Error('Password is incorrect')
    }
  } catch (error) {
    throw error
  }
}

export { register, login }

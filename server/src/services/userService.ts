import bcrypt from 'bcrypt'
import { Secret, sign } from 'jsonwebtoken'
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
          expiresIn: '2h',
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

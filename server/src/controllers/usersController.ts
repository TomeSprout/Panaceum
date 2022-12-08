import type { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import User from '../models/User'

interface notionKey {
  key: string
}

interface todoistKey {
  key: string
}

// @desc Create new Client Key
// @route POST /key
// @access Private
export const createNewUser = async (req: Request, res: Response): Promise<void> => {
  const { email, username, password, } = req.body

    // Confirm data
    if (!email || !username || !password) {
      res.status(400).json({ message: 'All fields are required' })
      return
    }

    // Check for duplicates
    const duplicate = await User.findOne({ email }).lean().exec()

    if (duplicate) {
      res.status(409).json({ message: 'Duplicate user' })
      return
    }

    // Hash password
    const hashedPassword: string = await bcrypt.hash(password, 10) // salt rounds

    const userObject: {
      email: string
      username: string
      password: string
    } = {
      email,
      username,
      password: hashedPassword,
    }

    // Create and store new user
    const user = await User.create(userObject)

    if (user) {
      res.status(201).json({ message: `New user ${username} created` })
    } else {
      res.status(400).json({ message: 'Invalid user data received' })
    }
  }

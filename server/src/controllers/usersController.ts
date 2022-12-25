import type { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import expressAsyncHandler from 'express-async-handler'
import User from '../models/User'

const getUser = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    // const user = await User.find().select('-password').lean()
    const { id } = req.body
    const user = await User.findById(id).exec()
    
    if (!user) {
      res.status(400).json({ message: 'No user found' })
      return
    }
    res.json(user)
  }
)

// @desc Create new Client Key
// @route POST /users
// @access Private
const createNewUser = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { email, username, password } = req.body

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
      res.status(201).json({ message: `Created new user - ${username}` })
    } else {
      res.status(400).json({ message: 'Invalid user data received' })
    }
  }
)

export { getUser, createNewUser }

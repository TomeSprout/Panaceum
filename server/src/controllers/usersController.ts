import type { Request, Response } from 'express'
import expressAsyncHandler from 'express-async-handler'

import User from '../models/User.model'
import { createSecret } from '../services/user.service'

const getUser = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.body
    const user = await User.findById(id).exec()

    if (!user) {
      res.status(400).json({ message: 'No user found' })
      return
    }
    res.json(user)
  }
)

// @desc Create new Client API Key
// @route POST /user/secrets
// @access Private
const handleSecret = async (req: Request, res: Response) => {
  const { email, username, secrets } = req.body

  // Confirm data
  if (!email || !username || !secrets) {
    res.status(400).json({ message: 'All fields are required' })
    return
  }

  try {
    const createdSecret = await createSecret(req.body)

    if (!createdSecret) {
      return res.status(400).send('Secret creation failed')
    }

    res.status(201).json({ message: `Created new secret` })
  } catch (error) {
    res.status(400).json({ message: 'Invalid secret received' })
  }
}

export { getUser, handleSecret }

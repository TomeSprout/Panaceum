import type { Request, Response } from 'express'
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
export const createKey = async (req: Request, res: Response): Promise<void> => {
  const key: notionKey | todoistKey = req.body

  if (typeof key !== 'string') {
    res.status(400).json({ message: `Invalid key` })
    return
  }
}
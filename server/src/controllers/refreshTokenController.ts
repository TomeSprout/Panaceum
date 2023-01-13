import { Request, Response } from 'express'
import { Secret, sign } from 'jsonwebtoken'

import User from '../models/User.model'

const handleRefreshToken = async (req: Request, res: Response) => {
  if (!req.cookies?.jwt) {
    return res.sendStatus(401)
  }

  const foundUser = await User.findOne({ refreshToken: req.cookies.jwt })

  if (!foundUser) {
    return res.sendStatus(403)
  }

  const accessToken = sign(
    {
      email: foundUser.email,
    },
    process.env.ACCESS_TOKEN_SECRET as Secret,
    {
      expiresIn: '5m',
    }
  )

  res.json({ accessToken })
}

export default handleRefreshToken

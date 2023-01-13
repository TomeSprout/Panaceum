import { Request, Response } from 'express'
import { Secret, sign } from 'jsonwebtoken'

import User from '../models/User.model'

const handleRefreshToken = (req: Request, res: Response) => {
  const cookies = req.cookies

  if (!cookies?.jwt) {
    return res.sendStatus(401)
  }

  const refreshToken = cookies.jwt

  const foundUser = User.findOne({
    refreshToken: refreshToken,
  })

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

import { Request, Response } from 'express'

import User from '../models/User.model'
import { Secret, sign, verify } from 'jsonwebtoken'

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
  verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as Secret,
    (err: any, decoded: any) => {
      if (err) {
        return res.sendStatus(403)
      }

      const accessToken = sign(
        {
          email: decoded.email
        },
        process.env.ACCESS_TOKEN_SECRET as Secret,
        {
          expiresIn: '5m'
        }
      )

      res.json({ accessToken })
    }
  )
}

export default handleRefreshToken

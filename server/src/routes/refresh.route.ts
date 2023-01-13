import { Router } from 'express'
import { Request, expressjwt } from 'express-jwt'
import { Secret } from 'jsonwebtoken'

import handleRefreshToken from '../controllers/refreshTokenController'

const router: Router = Router()

const getTokenFromCookie = (req: Request) => {
  const cookies = req.cookies
  
  if (!cookies) {
    return undefined
  }
  return cookies.jwt
}

router.get(
  '/',
  expressjwt({
    secret: process.env.REFRESH_TOKEN_SECRET as Secret,
    algorithms: ['HS256'],
    getToken: getTokenFromCookie,
  }),
  handleRefreshToken
)

export = router

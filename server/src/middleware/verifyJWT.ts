import { Secret, verify } from 'jsonwebtoken'
import { config } from 'dotenv'
import { NextFunction, Request, Response } from 'express'

config()

interface AuthRequest extends Request {
  email: string
}

const verifyJWT = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']

  if (!authHeader) {
    return res.sendStatus(401)
  }
  
  const token = authHeader.split(' ')[1]
  verify(token, process.env.ACCESS_TOKEN_SECRET as Secret, (err, decoded: any) => {
    if (err) {
      return res.sendStatus(403)
    }
    req.email = decoded.email
    next()
  })
}

export { verifyJWT }

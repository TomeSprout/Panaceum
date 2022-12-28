import { config } from 'dotenv'
import { Router } from 'express'
import { expressjwt } from 'express-jwt'
import { Secret } from 'jsonwebtoken'

import { createNewUser, getUser } from '../controllers/usersController'

config()

const jwtSecret = process.env.ACCESS_TOKEN_SECRET as Secret

const router: Router = Router()

router
  .route('/users')
  .get(expressjwt({ secret: jwtSecret, algorithms: ['HS256'] }), getUser)
  .post(createNewUser)

export { router }

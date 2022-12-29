import { config } from 'dotenv'
import { Router } from 'express'
import { expressjwt } from 'express-jwt'
import { Secret } from 'jsonwebtoken'

import { handleLogin, handleRegistration } from '../controllers/authController'
import { createNewUser, getUser } from '../controllers/usersController'

config()

const jwtSecret = process.env.ACCESS_TOKEN_SECRET as Secret

const router: Router = Router()

router
  .route('/')
  .get(expressjwt({ secret: jwtSecret, algorithms: ['HS256'] }), handleLogin)
  .post(handleRegistration)

export = router

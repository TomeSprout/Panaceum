import { config } from 'dotenv'
import { Router } from 'express'
import { expressjwt } from 'express-jwt'
import { Secret } from 'jsonwebtoken'

import { getUser } from '../controllers/usersController'

config()

const jwtSecret = process.env.ACCESS_TOKEN_SECRET as Secret

const router: Router = Router()

router.route('/')
router.get(
  '/:id',
  expressjwt({ secret: jwtSecret, algorithms: ['HS256'] }),
  getUser
)

export = router

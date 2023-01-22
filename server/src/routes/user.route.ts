import { Router } from 'express'
import { expressjwt } from 'express-jwt'
import { Secret } from 'jsonwebtoken'

import { getUser, handleSecret } from '../controllers/usersController'

const jwtSecret = process.env.ACCESS_TOKEN_SECRET as Secret

const router: Router = Router()

router.route('/')
router.get(
  '/:id',
  expressjwt({ secret: jwtSecret, algorithms: ['HS256'] }),
  getUser
)
router.post(
  '/secrets',
  expressjwt({ secret: jwtSecret, algorithms: ['HS256'] }),
  handleSecret
)

export = router

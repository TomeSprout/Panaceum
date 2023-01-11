import { config } from 'dotenv'
import { Router } from 'express'
import { expressjwt } from 'express-jwt'
import { Secret } from 'jsonwebtoken'

import { handleLogin, handleRegistration } from '../controllers/authController'

config()

const jwtSecret = process.env.ACCESS_TOKEN_SECRET as Secret

const router: Router = Router()

router.route('/')
router.post('/signup', handleRegistration)
router.post('/login', handleLogin)

export = router

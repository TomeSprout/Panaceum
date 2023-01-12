import { Router } from 'express'

import { handleLogin, handleRegistration } from '../controllers/authController'

const router: Router = Router()

router.route('/')
router.post('/signup', handleRegistration)
router.post('/login', handleLogin)

export = router

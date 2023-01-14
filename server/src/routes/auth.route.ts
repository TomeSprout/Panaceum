import { Router } from 'express'

import {
  handleLogin,
  handleLogout,
  handleRegistration,
} from '../controllers/authController'

const router: Router = Router()

router.route('/')
router.post('/signup', handleRegistration)
router.post('/login', handleLogin)
router.get('/logout', handleLogout)

export = router

import { Router } from 'express'
import { createNewUser } from '../controllers/usersController'

const router: Router = Router()

router.route('/').post(createNewUser)

module.exports = router

import { Router } from 'express'
import { getUser, createNewUser } from '../controllers/usersController'

const router: Router = Router()

router.route('/').get(getUser).post(createNewUser)

module.exports = router

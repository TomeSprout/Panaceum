import { Router } from 'express'

import handleRefreshToken from '../controllers/refreshTokenController'

const router: Router = Router()

router.get('/', handleRefreshToken)

export = router
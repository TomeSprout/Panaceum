import { Router } from 'express'

const router: Router = Router()

router.get('/', function(req, res, next) {
  res.send('API is working properly')
})

module.exports = router
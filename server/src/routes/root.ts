import { Router } from 'express'
import * as path from 'path'

const regexp = '^/$|/index(.html)?'
const router: Router = Router()

router.get(regexp, (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

module.exports = router
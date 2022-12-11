import * as dotenv from 'dotenv'
import * as express from 'express'
import * as cors from 'cors'
import * as path from 'path'

import { connection as MongoDBConnection } from 'mongoose'

import { databaseConnection } from './configuration/databaseConnection'
import { corsOptions } from './configuration/corsOptions'

import OrganizeMultiSelects from './middleware/OrganizeMultiSelects'
import RemoveEmptyEntries from './middleware/RemoveEmptyEntries'
import NotionPageIconCover from './middleware/NotionPageIconCover'

dotenv.config()

const app = express.default()
const PORT: string | number = (process.env.PORT as string) || 3500

databaseConnection()

app.use(cors.default(corsOptions))
app.use(express.json())
app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/', require('./routes/root'))
app.use('/users', require('./routes/userRoutes'))
app.use('*', (req, res) => {
  res.status(404)

  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'))
  } else if (req.accepts('json')) {
    res.json({ message: '404 Not Found' })
  } else {
    res.type('txt').send('404 Not Found')
  }
})

MongoDBConnection.once('open', (): void => {
  console.log('Connected to MongoDB')
  app.listen(PORT, () => console.log(`⚡️ Server running on Port: ${PORT}`))
})

const main = async () => {
  // await OrganizeMultiSelects()
  // await RemoveEmptyEntries()
  await NotionPageIconCover()
}

main()

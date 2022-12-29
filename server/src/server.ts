import * as cors from 'cors'
import * as dotenv from 'dotenv'
import * as express from 'express'
import { connection as MongoDBConnection, set as MongoSet } from 'mongoose'
import * as path from 'path'

import { corsOptions } from './configuration/corsOptions'
import { databaseConnection } from './configuration/databaseConnection.config'

dotenv.config({ path: path.resolve('../.env') })

const app = express.default()
const PORT: string | number = (process.env.SERVER_PORT as string) || 3500

databaseConnection()
MongoSet('strictQuery', true)

app.use(cors.default(corsOptions))
app.use(express.json())
app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/', require('./routes/root'))
app.use('/auth', require('./routes/userRoutes'))
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

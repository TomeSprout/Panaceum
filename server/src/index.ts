import * as dotenv from 'dotenv'
import * as express from 'express'
import * as cors from 'cors'
import * as path from 'path'

import { connection as MongoDBConnection } from 'mongoose'

import { databaseConnection } from './configuration/databaseConnection'

import OrganizeMultiSelects from './middleware/OrganizeMultiSelects'
import RemoveEmptyEntries from './middleware/RemoveEmptyEntries'
import NotionPageIconCover from './middleware/NotionPageIconCover'

dotenv.config()

const app = express.default()
const PORT: string | number = (process.env.PORT as string) || 3500

databaseConnection()

const main = async () => {
  // await OrganizeMultiSelects()
  // await RemoveEmptyEntries()
  await NotionPageIconCover()
}

main()

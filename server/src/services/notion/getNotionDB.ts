import { Client } from '@notionhq/client'
import {
  GetDatabaseResponse,
  GetPageResponse,
} from '@notionhq/client/build/src/api-endpoints'

import { config } from 'dotenv'
config()

const notion = new Client({ auth: process.env.NOTION_TOKEN })
const databaseId: string = process.env.NOTION_DATABASE_ID as string

export const getNotionDBPages = async (
  filter?: any
): Promise<
  Array<GetPageResponse>
> => {
  const { results } = await notion.databases.query({
    database_id: databaseId,
  })

  return results
}

export const getNotionDBProperties = async (
  filter?: any
): Promise<GetDatabaseResponse['properties']> => {
  const { properties } = await notion.databases.retrieve({
    database_id: databaseId,
  })

  return properties
}

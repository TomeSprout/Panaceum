import { Client } from '@notionhq/client'
import {
  GetDatabaseResponse,
  GetPageResponse,
  QueryDatabaseParameters,
} from '@notionhq/client/build/src/api-endpoints'

import { config } from 'dotenv'
config()

const notion = new Client({ auth: process.env.NOTION_TOKEN })
const databaseId: string = process.env.NOTION_DATABASE_ID as string

export const getNotionDBPages = async (
  queryFilter?: QueryDatabaseParameters
): Promise<GetPageResponse[]> => {
  if (queryFilter !== undefined) {
    const { results } = await notion.databases.query({
      database_id: databaseId,
      filter: queryFilter.filter,
    })
    return results
  }

  const { results } = await notion.databases.query({
    database_id: databaseId,
  })

  return results
}

export const getNotionDBProperties = async (): Promise<
  GetDatabaseResponse['properties']
> => {
  const { properties } = await notion.databases.retrieve({
    database_id: databaseId,
  })

  return properties
}

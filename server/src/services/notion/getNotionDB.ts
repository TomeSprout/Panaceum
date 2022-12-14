import { Client } from '@notionhq/client'
import { config } from 'dotenv'

config()

type GetMethod = 'retrieve' | 'query'

const getNotionDB = async (
  getMethod: GetMethod,
  filter?: any
): Promise<any> => {
  const notion = new Client({ auth: process.env.NOTION_TOKEN })
  const databaseId: string = process.env.NOTION_DATABASE_ID as string

  if (getMethod === 'retrieve') {
    const { properties } = await notion.databases.retrieve({
      database_id: databaseId,
    })

    return properties
  }

  if (getMethod === 'query') {
    const { results } = await notion.databases.query({
      database_id: databaseId,
    })

    return results
  }
}

export default getNotionDB

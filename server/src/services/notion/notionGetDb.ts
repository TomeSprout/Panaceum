import { Client } from '@notionhq/client'
import dotenv from 'dotenv'

dotenv.config()

const notionGetDb = async (
  getMethod: string = 'retrieve',
  filter?: any
): Promise<any> => {
  const notion = new Client({ auth: process.env.NOTION_TOKEN })
  const databaseId: string = process.env.NOTION_DATABASE_ID as string

  if (getMethod === 'retrieve') {
    const results = await notion.databases.retrieve({
      database_id: databaseId,
    })

    return results
  }

  if (getMethod === 'query') {
    const results = await notion.databases.query({
      database_id: databaseId,
    })

    return results
  }
}

export default notionGetDb

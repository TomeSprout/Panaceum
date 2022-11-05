import { Client } from '@notionhq/client'
import { config } from 'dotenv'

config()

const NotionPageIconCover = async () => {
  const notion = new Client({ auth: process.env.NOTION_TOKEN })
  const databaseId: string = process.env.NOTION_DATABASE_ID as string

  const { results }: { results: any } = await notion.databases.query({
    database_id: databaseId,
  })
}

export default NotionPageIconCover
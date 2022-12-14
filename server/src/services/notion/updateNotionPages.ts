import { Client } from '@notionhq/client'
import dotenv from 'dotenv'

dotenv.config()

const updateNotionPages = (pageId: string) => {
  const notion = new Client({ auth: process.env.NOTION_TOKEN })
  
  notion.pages.update({
    page_id: pageId,
  })
}

export default updateNotionPages

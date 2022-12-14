import { Client } from '@notionhq/client'
import dotenv from 'dotenv'

dotenv.config()

type UpdateMethod = 'delete' | 'sort'

const updateNotionPages = (updateMethod: UpdateMethod ,pageId: string) => {
  const notion = new Client({ auth: process.env.NOTION_TOKEN })
  
  if (updateMethod = 'delete') {
    notion.pages.update({
      page_id: pageId,
      archived: true,
    })
  }
}

export default updateNotionPages

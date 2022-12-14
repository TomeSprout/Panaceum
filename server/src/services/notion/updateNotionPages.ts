import { Client } from '@notionhq/client'
import { UpdatePageParameters } from '@notionhq/client/build/src/api-endpoints'

import dotenv from 'dotenv'
dotenv.config()

const notion = new Client({ auth: process.env.NOTION_TOKEN })

const updateNotionPages = async (
  params: UpdatePageParameters
): Promise<void> => {
  await notion.pages.update({
    page_id: params.page_id,
    properties: params.properties,
    icon: params.icon,
    cover: params.cover,
    archived: params.archived,
  })
}

export default updateNotionPages

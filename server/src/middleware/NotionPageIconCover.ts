import { Client } from '@notionhq/client'
import { config } from 'dotenv'

config()

const checkPageMissingIcon = (icon: any) => {
  return !icon
}

const checkPageMissingCover = (cover: any) => {
  return !cover
}

const updatePageIcon = async (pageId: string, newIcon: any) => {
  const notion = new Client({ auth: process.env.NOTION_TOKEN })

  await notion.pages.update({
    page_id: pageId,
    icon: newIcon,
  })
}

const NotionPageIconCover = async () => {
  const notion = new Client({ auth: process.env.NOTION_TOKEN })
  const databaseId: string = process.env.NOTION_DATABASE_ID as string

  const { results }: { results: any } = await notion.databases.query({
    database_id: databaseId,
  })

  const missingIcons: any[] = []

  const iconObject: any = {
    type: 'external',
    external: { url: 'https://www.notion.so/icons/bell-off_lightgray.svg' }
  }

  results.forEach((element: any) => {
    if (checkPageMissingIcon(element.icon)) {
      missingIcons.push(element.id)
      updatePageIcon(element.id, iconObject)
    }
  })
}

export default NotionPageIconCover
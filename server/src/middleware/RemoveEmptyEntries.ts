import { Client } from '@notionhq/client'
import { config } from 'dotenv'
import WriteToJSON from './WriteToJSON'

config()

const RemoveEmptyEntries = async () => {
  const notion = new Client({ auth: process.env.NOTION_TOKEN })
  const databaseId: string = process.env.NOTION_DATABASE_ID as string

  const { results }: { results: any } = await notion.databases.query({
    database_id: databaseId,
  })

  const emptyEntries: any[] = []

  results.forEach((element: any) => {
    const properties = Object.entries(element.properties)
    properties.forEach((property: any) => {
      if (property[1].id === 'title' || property[1].type === 'title') {
        if (
          property[1].title.length === 0 ||
          property[1].title[0].plain_text === ' ' ||
          property[1].title[0].plain_text === '  ' ||
          property[1].title[0].plain_text === '   '
        ) {
          console.log(property)
          emptyEntries.push(element)
        }
      }
    })
  })

  WriteToJSON(emptyEntries)
}

export default RemoveEmptyEntries

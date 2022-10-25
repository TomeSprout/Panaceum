import { Client } from '@notionhq/client'
import dotenv from 'dotenv'

dotenv.config()

const GetMultiSelectOptions = async () => {
  const notion = new Client({ auth: process.env.NOTION_TOKEN })
  const databaseId: string = process.env.NOTION_DATABASE_ID as string

  const { properties }: { properties: any } = await notion.databases.retrieve({
    database_id: databaseId,
  })

  type StringRequest = string
  type SelectColor =
    | 'default'
    | 'gray'
    | 'brown'
    | 'orange'
    | 'yellow'
    | 'green'
    | 'blue'
    | 'purple'
    | 'pink'
    | 'red'
  type SelectPropertyResponse = {
    id: StringRequest
    name: StringRequest
    color?: SelectColor
  }

  interface MultiSelectDatabasePropertyOptions {
    options: Array<SelectPropertyResponse>
    forEach(
      callback: (propertyOptionObject: SelectPropertyResponse) => void
    ): void
  }

  const opt: MultiSelectDatabasePropertyOptions =
    properties.Genre.multi_select.options
  opt.forEach((element) => {
    delete element.color
  })
  
  return opt
}

export default GetMultiSelectOptions

import { Client } from "@notionhq/client"
import dotenv from "dotenv"

const fs = require('fs');

dotenv.config()

const OrganizeMultiSelects = async () => {
  const notion = new Client({ auth: process.env.NOTION_TOKEN })
  const databaseId: string = process.env.NOTION_DATABASE_ID as string
  
  const { properties }: { properties: any } = await notion.databases.retrieve({
    "database_id": databaseId,
  })

  // Filter for DB Query
  //
  // "filter": {
  //   "property": "Genre",
  //   "multi_select": {
  //     "is_not_empty": true
  //   }
  // }

  // const stringifyResponse = JSON.stringify(properties)
  // fs.writeFile('res.json', stringifyResponse, (err: Error) => {
  //   if (err) throw err;
  //   console.log("new data added to file")
  // })

  type StringRequest = string
  type SelectColor = "default" | "gray" | "brown" | "orange" | "yellow" | "green" | "blue" | "purple" | "pink" | "red"
  type SelectPropertyResponse = {
    id: StringRequest
    name: StringRequest
    color?: SelectColor
  }

  interface MultiSelectDatabasePropertyOptions {
    options: Array<SelectPropertyResponse>
    forEach(callback: (propertyOptionObject: SelectPropertyResponse) => void) : void
  }
}

export default OrganizeMultiSelects
import { Client } from "@notionhq/client"
import dotenv from "dotenv"

const fs = require('fs');

dotenv.config()

const OrganizeMultiSelects = async () => {
  const notion = new Client({ auth: process.env.NOTION_TOKEN })
  const databaseId: string = process.env.NOTION_DATABASE_ID as string
  
  const { object } = await notion.databases.query({
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

  const stringifyResponse = JSON.stringify(object)
  fs.writeFile('res.json', stringifyResponse, (err: Error) => {
    if (err) throw err;
    console.log("new data added to file")
  })

  // const {multiSelect} = response.results[0].properties.Genre.multi_select
}

export default OrganizeMultiSelects
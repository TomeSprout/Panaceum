import { Client } from '@notionhq/client'
import dotenv from 'dotenv'
import GetMultiSelectOptions from './GetMultiSelectOptions'

const fs = require('fs')

dotenv.config()

const OrganizeMultiSelects = async () => {
  const notion = new Client({ auth: process.env.NOTION_TOKEN })
  const databaseId: string = process.env.NOTION_DATABASE_ID as string
  
  const { results }: { results: any } = await notion.databases.query({
    database_id: databaseId,
    "filter": {
      "property": "Genre",
      "multi_select": {
        "is_not_empty": true
      }
    }
  })

  const options = await GetMultiSelectOptions()
  console.log(`Options ->`, options)

  // const stringifyResponse = JSON.stringify(results)
  // fs.writeFile('res.json', stringifyResponse, (err: Error) => {
  //   if (err) throw err;
  //   console.log("New response data added to file")
  // })

  // forEach element.properties.Genre.multi_select.[options]

}

export default OrganizeMultiSelects

import { Client } from "@notionhq/client"
import dotenv from "dotenv"

dotenv.config()

const OrganizeMultiSelects = async () => {
  const notion = new Client({ auth: process.env.NOTION_TOKEN })
  const databaseId: string = process.env.NOTION_DATABASE_ID as string
  
  const response = await notion.databases.query({
    database_id: databaseId,
  })

  console.log(response)
}

export default OrganizeMultiSelects
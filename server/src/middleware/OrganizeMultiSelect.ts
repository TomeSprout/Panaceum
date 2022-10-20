import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const databaseId: string = process.env.NOTION_DATABASE_ID as string;
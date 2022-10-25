// @ts-nocheck

import { Client } from '@notionhq/client'
import dotenv from 'dotenv'

import {
  GetPagePropertyResponse,
  PartialPageObjectResponse,
  PropertyItemObjectResponse,
} from '../ts/type/types'
import {
  NotionQuery,
  PropertyValue,
  GetPagePropertyResponseInterface,
} from '../ts/interface/interfaces'

dotenv.config()

const notionClient: Client = new Client({ auth: process.env.NOTION_TOKEN })
const databaseId: string = process.env.NOTION_DATABASE_ID as string

//Gets tasks from the database.
export const notion = async () => {
  const pages = []
  let cursor: string | null | undefined = undefined

  while (true) {
    const { results, next_cursor }: NotionQuery =
      await notionClient.databases.query({
        database_id: databaseId,
        start_cursor: cursor,
      })

    pages.push(...results)

    if (!next_cursor) {
      break
    }

    cursor = next_cursor
  }

  console.log(`${pages.length} pages successfully fetched.`)

  const tasks = []
  for (const page of pages) {
    const pageId: string = page.id

    const titlePropertyId: string = page.properties['Task'].id
    const titlePropertyItems = await getPropertyValue({
      pageId,
      propertyId: titlePropertyId,
    })
    const title =
      titlePropertyItems.length !== 0
        ? titlePropertyItems
            .map((propertyItem) => propertyItem.title.plain_text)
            .join('')
        : 'No Title'

    const descriptionPropertyId: string = page.properties['Desc'].id
    const descriptionPropertyItem = await getPropertyValue({
      pageId,
      propertyId: descriptionPropertyId,
    })
    const description =
      descriptionPropertyItem.length !== 0
        ? descriptionPropertyItem
            .map((propertyItem) => propertyItem.rich_text.plain_text)
            .join('')
        : 'No Description'

    const dueDatePropertyId: string = page.properties['Due'].id
    const dueDatePropertyItems = await getPropertyValue({
      pageId,
      propertyId: dueDatePropertyId,
    })
    const dueDate =
      dueDatePropertyItems.date !== null
        ? dueDatePropertyItems.date
        : 'No Due Date'

    tasks.push({ pageId, title, description, dueDate })
  }

  return tasks
}

// If property is paginated, returns an array of property items.
// Otherwise, it will return a single property item.

const getPropertyValue = async ({ pageId, propertyId }: PropertyValue) => {
  const propertyItem = await notionClient.pages.properties.retrieve({
    page_id: pageId,
    property_id: propertyId,
  })
  if (propertyItem.object === 'property_item') {
    return propertyItem
  }

  // Property is paginated.
  let nextCursor = propertyItem.next_cursor
  const results = propertyItem.results

  while (nextCursor !== null) {
    const propertyItem = await notionClient.pages.properties.retrieve({
      page_id: pageId,
      property_id: propertyId,
      start_cursor: nextCursor,
    })

    nextCursor = propertyItem.next_cursor
    results.push(...propertyItem.results)
  }

  return results
}

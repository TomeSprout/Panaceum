import { getNotionDBPages } from './getNotionDB'
import updateNotionPages from './updateNotionPages'
import GetMultiSelectOptions from './GetMultiSelectOptions'

import { config } from 'dotenv'
config()

interface SelectPropertyResponse {
  id: string
  name: string
  color?: string
}

const sortMultiSelectOptions = (multiSelectOptions: SelectPropertyResponse[], options: any) => {
  const newMultiSelectOptions: SelectPropertyResponse[] = []

  multiSelectOptions.forEach((element: any) => {
    for (let index = 0, len = options.length; index < len; index++) {
      multiSelectOptions.forEach((multiSelectOption: SelectPropertyResponse) => {
        if (
          multiSelectOption.id === options[index].id &&
          !newMultiSelectOptions.includes(multiSelectOption)
        ) {
          newMultiSelectOptions.push(multiSelectOption)
        }
      })
    }
  })

  return newMultiSelectOptions
}

const updateMultiSelectOptions = async (
  currentPageId: string,
  propertyName: string,
  updatedOptionArray: any[]
) => {

  const response = await updateNotionPages(
    {
      page_id: currentPageId,
      properties: {
        [propertyName]: {
          type: 'multi_select',
          multi_select: updatedOptionArray,
        },
      }
    }
  )

  return response
}

const OrganizeMultiSelects = async () => {
  const databaseId: string = process.env.NOTION_DATABASE_ID as string
  const multiSelectName: string = 'Genre'

  interface MultiSelectPropertyFilter {
      multi_select: {
        contains: string
      } | {
        does_not_contain: string
      } | {
        is_empty: true
      } | {
        is_not_empty: true
      }
      property: string
      type?: "multi_select"
  }

  let queryFilter: MultiSelectPropertyFilter = {
    property: multiSelectName,
    multi_select: {
      is_not_empty: true,
    },
  }

  const results = await getNotionDBPages({ database_id: databaseId, filter: queryFilter})
  const optionsComparator = await GetMultiSelectOptions()
  
  for (const element of results) {
    if ('properties' in element) {
      if ('multi_select' in element.properties[multiSelectName]) {
        const multiSelectOptions = element.properties[multiSelectName].multi_select
        const updatedOptions = sortMultiSelectOptions(
          multiSelectOptions,
          optionsComparator
        )
        await updateMultiSelectOptions(
          element.id,
          multiSelectName,
          updatedOptions
        )
      }
    }

  }
}

export default OrganizeMultiSelects

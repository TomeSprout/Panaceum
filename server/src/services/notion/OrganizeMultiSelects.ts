import { getNotionDBPages, getNotionDBProperties } from './getNotionDB'
import updateNotionPages from './updateNotionPages'

import { config } from 'dotenv'
config()

interface SelectPropertyResponse {
  id: string
  name: string
  color?: string
}

// Need to return user selected Multi-Select Property from client
const multiSelectName: string = 'Tags' // placeholder

const GetMultiSelectOptions = async (): Promise<
  SelectPropertyResponse[] | undefined
> => {
  const properties = await getNotionDBProperties()

  if ('multi_select' in properties[multiSelectName]) {
    const options: SelectPropertyResponse[] =
      properties[multiSelectName].multi_select.options
    for (const element of options) {
      delete element.color
    }
    return options
  }
  return undefined
}

const sortMultiSelectSelections = (
  multiSelectSelections: SelectPropertyResponse[],
  options: SelectPropertyResponse[]
): SelectPropertyResponse[] => {
  const sortedOptions: SelectPropertyResponse[] = []

  for (const element of multiSelectSelections) {
    for (let index = 0, len = options.length; index < len; index++) {
      multiSelectSelections.forEach((selection: SelectPropertyResponse) => {
        if (
          selection.id === options[index].id &&
          !sortedOptions.includes(selection)
        ) {
          sortedOptions.push(selection)
        }
      })
    }
  }

  return sortedOptions
}

const updateMultiSelectOptions = async (
  currentPageId: string,
  propertyName: string,
  updatedOptionArray: any[]
): Promise<void> => {
  const response = await updateNotionPages({
    page_id: currentPageId,
    properties: {
      [propertyName]: {
        type: 'multi_select',
        multi_select: updatedOptionArray,
      },
    },
  })

  return response
}

const OrganizeMultiSelects = async (): Promise<void> => {
  const databaseId: string = process.env.NOTION_DATABASE_ID as string

  interface MultiSelectPropertyFilter {
    multi_select:
      | {
          contains: string
        }
      | {
          does_not_contain: string
        }
      | {
          is_empty: true
        }
      | {
          is_not_empty: true
        }
    property: string
    type?: 'multi_select'
  }

  const queryFilter: MultiSelectPropertyFilter = {
    property: multiSelectName,
    multi_select: {
      is_not_empty: true,
    },
  }

  const results = await getNotionDBPages({
    database_id: databaseId,
    filter: queryFilter,
  })
  const optionsComparator = await GetMultiSelectOptions()

  for (const element of results) {
    if ('properties' in element) {
      if ('multi_select' in element.properties[multiSelectName]) {
        const multiSelectSelection =
          element.properties[multiSelectName].multi_select

        if (optionsComparator !== undefined) {
          const updatedOptions = sortMultiSelectSelections(
            multiSelectSelection,
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
}

export default OrganizeMultiSelects

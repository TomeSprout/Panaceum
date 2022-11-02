import { Client } from '@notionhq/client'
import { config } from 'dotenv'
import GetMultiSelectOptions from './GetMultiSelectOptions'
import WriteToJSON from './WriteToJSON'

config()

// ! Logic currently incorrect. DO NOT USE
const checkOutOfOrder = (operand: any, testOperand: any): boolean => {
  let outOfOrder = false

  operand.forEach((element: any) => {
    const pageMultiSelect = element.properties.Genre.multi_select
    pageMultiSelect.forEach(
      (multiSelectOption: any, multiSelectOptionIndex: any) => {
        testOperand.forEach((optionElement: any, optionIndex: any) => {
          if ((multiSelectOption.id = optionElement.id)) {
            if (multiSelectOptionIndex > optionIndex) {
              outOfOrder = true
              multiSelectOption.outOfOrder = true
            }
          }
        })
      }
    )
  })

  return outOfOrder
}

const sortMultiSelectOptions = async (results: any, options: any) => {
  const newMultiSelectOptions: any[] = []
  
  results.forEach((element: any) => {
    const pageMultiSelect = element.properties.Genre.multi_select

    for (let index = 0, len = options.length; index < len; index++) {
      pageMultiSelect.forEach((multiSelectOption: any) => {
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
  propertyName: string = 'Genre',
  updatedOptionArray: any[]
) => {
  const notion = new Client({ auth: process.env.NOTION_TOKEN })

  const response = await notion.pages.update({
    page_id: currentPageId,
    properties: {
      [propertyName]: {
        type: 'multi_select',
        multi_select: updatedOptionArray,
      },
    },
  })

  console.log(response)
}

const OrganizeMultiSelects = async () => {
  const notion = new Client({ auth: process.env.NOTION_TOKEN })
  const databaseId: string = process.env.NOTION_DATABASE_ID as string

  const { results }: { results: any } = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: 'Genre',
      multi_select: {
        is_not_empty: true,
      },
    },
  })

  const options: any = await GetMultiSelectOptions()

  WriteToJSON(results)
}

export default OrganizeMultiSelects

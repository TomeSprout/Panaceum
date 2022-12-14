import { getNotionDBProperties } from './getNotionDB'

interface SelectPropertyResponse {
  id: string
  name: string
  color?: string
}

const GetMultiSelectOptions = async (): Promise<SelectPropertyResponse[] | undefined> => {
  const properties = await getNotionDBProperties()
  
  // Need to return user selected Multi-Select Property from client
  const multiSelectName: string = 'Tags' // placeholder

  if ('multi_select' in properties[multiSelectName]) {
    const options: SelectPropertyResponse[] = properties[multiSelectName].multi_select.options
    for (const element of options) {
      delete element.color
    }
    return options
  }
  return undefined
}

export default GetMultiSelectOptions

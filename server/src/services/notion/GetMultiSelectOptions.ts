import getNotionDB from './getNotionDB'

const GetMultiSelectOptions = async () => {
  const properties = await getNotionDB('retrieve')
  // Need to return user selected Multi-Select Property from client 
  const multiSelectPropertyName: string = 'Genre' // placeholder

  type StringRequest = string
  type SelectColor =
    | 'default'
    | 'gray'
    | 'brown'
    | 'orange'
    | 'yellow'
    | 'green'
    | 'blue'
    | 'purple'
    | 'pink'
    | 'red'
  type SelectPropertyResponse = {
    id: StringRequest
    name: StringRequest
    color?: SelectColor
    order?: number
  }

  interface MultiSelectDatabasePropertyOptions {
    options: Array<SelectPropertyResponse>
    forEach(
      callback: (propertyOptionObject: SelectPropertyResponse) => void
    ): void
  }

  const options: MultiSelectDatabasePropertyOptions =
    properties[multiSelectPropertyName].multi_select.options

  options.forEach((element) => {
    delete element.color
  })

  return options
}

export default GetMultiSelectOptions

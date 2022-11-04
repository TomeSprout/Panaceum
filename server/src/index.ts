import OrganizeMultiSelects from './middleware/OrganizeMultiSelects'
import RemoveEmptyEntries from './middleware/RemoveEmptyEntries'

const main = async () => {
  // await OrganizeMultiSelects()
  await RemoveEmptyEntries()
}

main()

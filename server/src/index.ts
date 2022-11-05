import OrganizeMultiSelects from './middleware/OrganizeMultiSelects'
import RemoveEmptyEntries from './middleware/RemoveEmptyEntries'
import NotionPageIconCover from './middleware/NotionPageIconCover'

const main = async () => {
  // await OrganizeMultiSelects()
  // await RemoveEmptyEntries()
  await NotionPageIconCover()
}

main()

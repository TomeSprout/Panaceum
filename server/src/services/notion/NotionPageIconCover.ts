import { getNotionDB } from './getNotionDB'
import updateNotionPages from './updateNotionPages'

const checkPageMissingIcon = (icon: any) => {
  return !icon
}

const checkPageMissingCover = (cover: any) => {
  return !cover
}

const updatePageIcon = async (pageId: string, newIcon: any) => {
  updateNotionPages({ page_id: pageId, icon: newIcon })
}

const NotionPageIconCover = async () => {
  const results = await getNotionDB()

  const missingIcons: any[] = []

  const iconObjectExternalNotionIcon = {
    type: 'external',
    external: { url: 'https://www.notion.so/icons/bell-off_lightgray.svg' },
  }

  const iconObjectEmoji = {
    type: 'emoji',
    emoji: '🤪',
  }

  results.forEach((element: any) => {
    if (checkPageMissingIcon(element.icon)) {
      missingIcons.push(element.id)
      updatePageIcon(element.id, iconObjectExternalNotionIcon)
    }
  })
}

export default NotionPageIconCover

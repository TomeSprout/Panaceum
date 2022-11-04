import { Client } from '@notionhq/client'
import { config } from 'dotenv'

config()

const isNotEmpty = (str: string | undefined) => {
  const checkLatinAlphabetCharacters = /[a-zA-Z]/
  const checkNumericDigits = /[0-9]/
  const checkCommonKeyboardSymbols = /[!@#%&{};:'",.<>?~`_=]/
  const checkCommonKeyboardSymbolsEscaped = /[\\\/\.\[\]\^\$\+\-\*\?\|\(\)]/
  const checkMacKeyboardSymbols = /[⌘⌥⌃⇧⇪]/
  const checkCjkIdeographs = /[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/
  const checkJapaneseHiraganaKatakana = /[\u3040-\u30ff\uff66-\uff9f]/
  const checkKoreanHangul = /[\u3131-\uD79D]/

  if (str !== undefined) {
    return /[a-zA-Z0-9\\\/\.\[\]\^\$\+\-\*\?\|\(\)!@#%&{};:'",.<>?~`_=\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f\u3131-\uD79D]/.test(str)
  }
  return
}

const RemoveEmptyEntries = async () => {
  const notion = new Client({ auth: process.env.NOTION_TOKEN })
  const databaseId: string = process.env.NOTION_DATABASE_ID as string

  const { results }: { results: any } = await notion.databases.query({
    database_id: databaseId,
  })

  const emptyEntries: any[] = []

  results.forEach((element: any) => {
    const properties = Object.entries(element.properties)
    properties.forEach(async (property: any) => {
      if (property[1].id === 'title' || property[1].type === 'title') {
        if (
          property[1].title.length === 0 ||
          !isNotEmpty(property[1].title[0].plain_text)
        ) {
          emptyEntries.push(element)

          await notion.pages.update({
            page_id: element.id,
            archived: true,
          })
        }
      }
    })
  })
}

export default RemoveEmptyEntries

import { SimpleGrid, TextInput } from '@mantine/core'
import { IconKey } from '@tabler/icons'
import React from 'react'

const APISetup = () => {
  return (
    <SimpleGrid
    mt={60}
    cols={2}
    spacing={75}
    breakpoints={[
      { maxWidth: 980, cols: 2, spacing: 'xl' },
      { maxWidth: 755, cols: 1, spacing: 'xl' },
    ]}
    >
      <TextInput
        placeholder={"Notion API Key"}
        label={"Notion API Key"}
        radius={"md"}
        size={"lg"}
        icon={<IconKey size={20} />}
      />
      <TextInput
        placeholder={"Todoist API Key"}
        label={"Todoist API Key"}
        radius={"md"}
        size={"lg"}
        icon={<IconKey size={20} />}
      />
    </SimpleGrid>
  )
}

export default APISetup
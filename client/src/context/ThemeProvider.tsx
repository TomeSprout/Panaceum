import { useState } from 'react'
import { ColorScheme, MantineProvider, Stack } from '@mantine/core'
import { theme } from '../theme'

export const ThemeProvider = ({ children }: any) => {
  const [colorScheme, setColorScheme] = useState(
    (localStorage.getItem('colorScheme') as ColorScheme | undefined) || 'Light'
  )

  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <Stack align="center" mt={50}></Stack>
    </MantineProvider>
  )
}

import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import {
  ColorScheme,
  ColorSchemeProvider,
  Container,
  MantineProvider,
} from '@mantine/core'
import { ColorSchemeToggle } from './ColorSchemeToggle'

const Layout = () => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark')
  const toggleColorScheme = (value?: ColorScheme) => {
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))
  }

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Container size="md" my={40}>
          <ColorSchemeToggle />
        </Container>
        <Outlet />
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default Layout

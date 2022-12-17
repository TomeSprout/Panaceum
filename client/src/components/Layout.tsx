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
    <main className="App">
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
    </main>
  )
}

export default Layout

import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import {
  ColorScheme,
  ColorSchemeProvider,
  Container,
  Group,
  MantineProvider,
} from '@mantine/core'
import GitHubActionButton from './GitHubActionButton'
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
            <Group position="right" my="xl">
              <GitHubActionButton />
              <ColorSchemeToggle />
            </Group>
          </Container>
          <Outlet />
        </MantineProvider>
      </ColorSchemeProvider>
    </main>
  )
}

export default Layout

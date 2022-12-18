import { useMantineColorScheme, ActionIcon, Group } from '@mantine/core'
import { IconSun, IconMoonStars } from '@tabler/icons'

export const ColorSchemeToggle = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  return (
      <ActionIcon
        onClick={() => toggleColorScheme()}
        size="xl"
        variant="light"
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[2],
          color:
            theme.colorScheme === 'dark'
              ? theme.colors.yellow[3]
              : theme.colors.blue[9],
        })}
      >
        {colorScheme === 'dark' ? (
          <IconSun size={25} />
        ) : (
          <IconMoonStars size={25} />
        )}
      </ActionIcon>
  )
}

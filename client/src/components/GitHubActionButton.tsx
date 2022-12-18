import { ActionIcon, Group, Tooltip } from '@mantine/core'
import { GithubIcon } from '@mantine/ds'

const GitHubActionButton = () => {
  return (
    <Tooltip label="View source on GitHub" position="bottom">
      <ActionIcon
        size="xl"
        component="a"
        href="https://github.com/TomeSprout/Panaceum"
        sx={(theme) => ({
          backgroundColor:
            theme.colors.dark[theme.colorScheme === 'dark' ? 9 : 6],
          color: '#fff',
          '&:hover': {
            backgroundColor:
              theme.colors.dark[theme.colorScheme === 'dark' ? 9 : 6],
          },
        })}
      >
        <GithubIcon size={25} />
      </ActionIcon>
    </Tooltip>
  )
}

export default GitHubActionButton

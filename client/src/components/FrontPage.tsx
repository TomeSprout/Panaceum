import { useNavigate } from 'react-router-dom'
import { createStyles, Title, Text, Button, Container } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    paddingTop: 120,
    paddingBottom: 80,

    '@media (max-width: 755px)': {
      paddingTop: 80,
      paddingBottom: 60,
    },
  },

  inner: {
    position: 'relative',
    zIndex: 1,
  },

  title: {
    textAlign: 'center',
    fontWeight: 700,
    fontSize: 40,
    letterSpacing: 1,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    marginBottom: theme.spacing.xs,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    '@media (max-width: 520px)': {
      fontSize: 28,
      textAlign: 'left',
    },
  },

  highlight: {
    color:
      theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6],
  },

  description: {
    textAlign: 'center',

    '@media (max-width: 520px)': {
      textAlign: 'left',
      fontSize: theme.fontSizes.md,
    },
  },

  controls: {
    marginTop: theme.spacing.lg,
    display: 'flex',
    justifyContent: 'center',

    '@media (max-width: 520px)': {
      flexDirection: 'column',
    },
  },

  control: {
    '&:not(:first-of-type)': {
      marginLeft: theme.spacing.md,
    },

    '@media (max-width: 520px)': {
      height: 42,
      fontSize: theme.fontSizes.md,

      '&:not(:first-of-type)': {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },
  },
}))

export function FrontPage() {
  const { classes } = useStyles()
  const largeScreen = useMediaQuery('(min-width: 960px)')
  let navigate = useNavigate()

  return (
    <Container
      className={classes.wrapper}
      size={1400}
      my={largeScreen ? 350 : 40}
    >
      <div className={classes.inner}>
        <Title className={classes.title}>Panaceum</Title>

        <Container p={0} size={600}>
          <Text size="lg" color="dimmed" className={classes.description}>
            <Text component="span" className={classes.highlight} inherit>
              Connect
            </Text>{' '}
            and
            <Text component="span" className={classes.highlight} inherit>
              {' '}
              Supercharge
            </Text>{' '}
            productivity with Notion and Todoist
          </Text>
        </Container>

        <div className={classes.controls}>
          <Button
            className={classes.control}
            size="lg"
            variant="default"
            color="gray"
            disabled
            onClick={(
              event: React.MouseEvent<HTMLButtonElement, MouseEvent>
            ) => {
              event.preventDefault()
              navigate('/apisetup', { replace: true })
            }}
          >
            Try It Out
          </Button>
          <Button
            className={classes.control}
            size="lg"
            onClick={(
              event: React.MouseEvent<HTMLButtonElement, MouseEvent>
            ) => {
              event.preventDefault()
              navigate('/auth', { replace: true })
            }}
          >
            Get Started
          </Button>
        </div>
      </div>
    </Container>
  )
}

export default FrontPage

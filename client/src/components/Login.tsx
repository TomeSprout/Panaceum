import { Container, Divider, Grid } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import SignUpForm from './SignUpForm'
import LoginForm from './LoginForm'

const Login = () => {
  const largeScreen = useMediaQuery('(min-width: 960px)')

  return (
    <Container size={largeScreen ? 'md' : 'xs'} my={largeScreen ? 350 : 40}>
      <Grid grow gutter={70}>
        <Grid.Col span={largeScreen ? 5 : 7}>
          <SignUpForm />
        </Grid.Col>
        {largeScreen ? (
          <Divider variant="solid" orientation="vertical" size="lg" />
        ) : null}
        <Grid.Col span={largeScreen ? 5 : 7}>
          <LoginForm />
        </Grid.Col>
      </Grid>
    </Container>
  )
}

export default Login

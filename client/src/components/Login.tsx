import { Container, Divider, Grid } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { useState } from 'react'
import SignUpForm from './SignUpForm'
import LoginForm from './LoginForm'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const largeScreen = useMediaQuery('(min-width: 960px)')

  const loginRequest = async () => {
    console.warn(email, password)
    let auth = { email, password }
    let request = fetch('http://localhost:3500/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(auth),
    })
  }

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
          <LoginForm
            setEmail={setEmail}
            setPassword={setPassword}
            login={loginRequest}
          />
        </Grid.Col>
      </Grid>
    </Container>
  )
}

export default Login

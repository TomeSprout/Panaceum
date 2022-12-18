import {
  Anchor,
  Button,
  Checkbox,
  Group,
  Paper,
  PasswordInput,
  TextInput,
  Title,
} from '@mantine/core'
import { Link } from 'react-router-dom'

const LoginForm = (setEmail: any, setPassword: any, login: any) => {
  return (
    <div>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        ...or Log in!
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          label="Email"
          placeholder="user@email.com"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Group position="apart" mt="lg">
          <Checkbox label="Remember me" sx={{ lineHeight: 1 }} />
          <Anchor<'a'>
            onClick={(event) => event.preventDefault()}
            href="#"
            size="md"
          >
            Forgot password?
          </Anchor>
        </Group>
        <Link to="/features" style={{ textDecoration: 'none' }}>
          <Button fullWidth mt="xl" onClick={login}>
            Log in
          </Button>
        </Link>
      </Paper>
    </div>
  )
}

export default LoginForm

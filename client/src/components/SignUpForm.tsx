import { Button, Paper, PasswordInput, TextInput, Title } from '@mantine/core'

const SignUpForm = () => {
  return (
    <section>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Make an Account
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Email" placeholder="user@email.com" required />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
        />
        <TextInput label="Username" placeholder="Username" required mt="md" />
        <Button fullWidth mt="xl">
          Sign Up
        </Button>
      </Paper>
    </section>
  )
}

export default SignUpForm

import { useContext, useEffect, useRef, useState } from 'react'

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
import { useForm } from '@mantine/form'
import { IconAt } from '@tabler/icons'

import axios from '../api/axios'
import AuthContext from '../context/AuthProvider'
import { Navigate } from 'react-router-dom'

const LOGIN_URL = '/auth/login'

const LoginForm = () => {
  const { setAuth } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [success, setSuccess] = useState(false)

  const userRef = useRef<HTMLInputElement>(null)
  const errRef = useRef<HTMLInputElement>(null)

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    // validate: {
    //   email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    // },
  })

  useEffect(() => {
    userRef.current?.focus()
  }, [])

  useEffect(() => {
    setErrorMessage('')
  }, [email, password])

  const handleSubmit = form.onSubmit(
    async (values, _event) => {
      _event.preventDefault()

      try {
        const response = await axios.post(
          LOGIN_URL,
          JSON.stringify({ email, password }),
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        )

        const accessToken = response?.data?.accessToken

        setAuth({ email, password, accessToken })
        setEmail('')
        setPassword('')
      } catch (error: any) {
        if (!error?.response) {
          setErrorMessage('No server response')
        }
        if (error.response?.status === 400) {
          setErrorMessage('Missing Email or Password')
        }
        if (error.response?.status === 401) {
          setErrorMessage('Unauthorized')
        }
        setErrorMessage('Login failure')

        errRef.current?.focus()
      }
    },
    (validationErrors, _values, _event) => {
      console.log(validationErrors)
    }
  )

  return (
    <section>
      <p
        ref={errRef}
        className={errorMessage ? 'ERRMSG' : 'offscreen'}
        aria-live="assertive"
      >
        {errorMessage}
      </p>
      {success && <Navigate to="/dashboard" replace={true} />}
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
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Email"
            placeholder="user@email.com"
            icon={<IconAt size={14} />}
            required
            onChange={(event) => {
              setEmail(event.currentTarget.value)
            }}
            value={email}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            onChange={(event) => {
              setPassword(event.currentTarget.value)
            }}
            value={password}
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
          <Button type="submit" fullWidth mt="xl">
            Log in
          </Button>
        </form>
      </Paper>
    </section>
  )
}

export default LoginForm

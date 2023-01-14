import { useContext, useEffect, useRef, useState } from 'react'

import { Button, Paper, PasswordInput, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'

import axios from '../api/axios'
import AuthContext from '../context/AuthProvider'

const REGISTER_URL = '/auth/signup'

const SignUpForm = () => {
  const { setAuth } = useContext(AuthContext)

  const errRef = useRef<HTMLInputElement>(null)

  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [success, setSuccess] = useState(false)

  const EMAIL_REGEX = /^\S+@\S+$/
  const USER_REGEX = /^\[A-z\][A-z0-9-_]{3,23}$/
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
  })

  useEffect(() => {
    setErrorMessage('')
  }, [email, password, username])

  const handleSubmit = form.onSubmit(
    async (values, _event) => {
      _event.preventDefault()

      try {
        await axios.post(
          REGISTER_URL,
          JSON.stringify({ email, password, username }),
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        )

        setAuth({ email, password, username })
        setEmail('')
        setPassword('')
        setUsername('')
        setSuccess(true)
        console.log(success)
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
        setErrorMessage('Registration failure')

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
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Email"
            placeholder="user@email.com"
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
          <TextInput
            label="Username"
            placeholder="Username"
            required
            mt="md"
            onChange={(event) => {
              setUsername(event.currentTarget.value)
            }}
            value={username}
          />
          <Button type="submit" fullWidth mt="xl">
            Sign Up
          </Button>
        </form>
      </Paper>
    </section>
  )
}

export default SignUpForm

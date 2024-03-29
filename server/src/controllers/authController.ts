import { Request, Response } from 'express'

import { login, logout, register } from '../services/auth.service'

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message
  }
  return String(error)
}

const handleRegistration = async (req: Request, res: Response) => {
  try {
    const registration = await register(req.body)

    if (registration === 'Missing Field') {
      return res.status(400).json({ message: 'All fields are required' })
    }

    if (registration === 'Duplicate') {
      return res.status(409).json({ message: 'Duplicate user' })
    }

    res.status(200).send('Creation successful')
  } catch (error) {
    return res.status(500).send(getErrorMessage(error))
  }
}

const handleLogin = async (req: Request, res: Response) => {
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ message: 'Username and password are required' })
  }

  try {
    const foundUser = await login(req.body)
    const accessToken = foundUser.accessToken

    res.cookie('jwt', foundUser.refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
    })

    return res.status(200).json({ accessToken })
  } catch (error) {
    return res.status(500).send(getErrorMessage(error))
  }
}

const handleLogout = async (req: Request, res: Response) => {
  try {
    // ! Delete token in client

    if (!req?.cookies?.jwt) {
      return res.sendStatus(204)
    }

    const foundUser = await logout(req.cookies.jwt)
    if (!foundUser) {
      res.clearCookie('jwt', {
        httpOnly: true,
        secure: true,
      })

      return res.sendStatus(204)
    }

    res.clearCookie('jwt', {
      httpOnly: true,
      secure: true,
    })
    res.sendStatus(204)
  } catch (error) {
    return res.status(500).send(getErrorMessage(error))
  }
}

export { handleRegistration, handleLogin, handleLogout }

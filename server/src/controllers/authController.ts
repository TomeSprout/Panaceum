import { Request, Response } from 'express'

import { register, login } from '../services/userService'

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message
  }
  return String(error)
}

const handleRegistration = async (req: Request, res: Response) => {
  const { email, username, password } = req.body
  
  try {
    const registration = await register(req.body)

    if (!email || !username || !password) {
      res.status(400).json({ message: 'All fields are required' })
      return
    }

    if (registration === 'Duplicate') {
      res.status(409).json({ message: 'Duplicate user' })
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
    res.status(200).send(foundUser)

    res.cookie('jwt', foundUser.refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    })

    res.json({ token: foundUser.accessToken })
    res.json({ success: `User ${foundUser.user.email} is logged in` })
  } catch (error) {
    return res.status(500).send(getErrorMessage(error))
  }

}

export { handleRegistration, handleLogin }

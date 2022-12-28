import { Request, Response } from 'express'

import { login } from '../services/userService'

const handleLogin = async (req: Request, res: Response) => {
  const { email, password }: any = req.body
  if (!email || !password) {
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
    return res.status(500).send('Error')
  }
}

export { handleLogin }

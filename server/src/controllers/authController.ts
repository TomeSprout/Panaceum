import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { Secret, sign } from 'jsonwebtoken'
import path from 'path'

const usersDB = {
  users: require('../models/users.json'),
  setUsers: function (data: any) {
    this.users = data
  },
}

const handleLogin = async (req: Request, res: Response) => {
  const { email, password }: any = req.body
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'Username and password are required' })
  }

  const foundUser = usersDB.users.find((person: any) => person.email === email)
  if (!foundUser) {
    return res.sendStatus(401)
  }

  const match = await bcrypt.compare(password, foundUser.password)

  if (match) {
    // Create JWTs
    const accessToken = sign(
      { email: foundUser.email },
      process.env.ACCESS_TOKEN_SECRET as Secret,
      { expiresIn: `30s` }
    )
    const refreshToken = sign(
      { email: foundUser.email },
      process.env.REFRESH_TOKEN_SECRET as Secret,
      { expiresIn: `1d` }
    )

    const otherUsers = usersDB.users.filter(
      (person: any) => person.email !== foundUser.email
    )
    const currentUser = { ...foundUser, refreshToken }
    usersDB.setUsers([...otherUsers, currentUser])

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    })
    res.json({ accessToken })

    res.json({ success: `User ${email} is logged in` })
  } else {
    res.sendStatus(401)
  }
}

export { handleLogin }

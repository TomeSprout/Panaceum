import bcrypt from 'bcrypt'
import { Document, model, Schema } from 'mongoose'

export interface APISecret {
  description: string
  label: string
  secret: string
}

export interface UserSchema extends Document {
  email: string
  username: string
  password: string
  secrets: Array<APISecret>
  shelf: string[]
  guest: boolean
  active: boolean
  blacklist: boolean
  refreshToken: string
}

const userSchema = new Schema<UserSchema>({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  secrets: [
    {
      description: String,
      label: String,
      secret: String,
    },
  ],
  shelf: [
    {
      description: String,
      label: String,
      bottle: [
        {
          content: String,
        },
      ],
    },
  ],
  guest: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: true,
  },
  blacklist: {
    type: Boolean,
    default: false,
  },
  refreshToken: {
    type: String,
  },
})

const saltRounds: number = 10

userSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, saltRounds)
  }
})

const User = model<UserSchema>('User', userSchema)

export default User

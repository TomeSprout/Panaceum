import { Document, Schema, model } from 'mongoose'

interface UserSchema extends Document {
  email: string
  username: string
  password: string
  secrets: string[]
  shelf: string[]
  guest: boolean
  active: boolean
  blacklist: boolean
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
})

const User = model<UserSchema>('User', userSchema)

export default User

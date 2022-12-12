import axios from 'axios'

const url = 'http://localhost:3500/users'

export const createNewUser = (newUser: any) => {
  return axios.post(url, newUser)
}
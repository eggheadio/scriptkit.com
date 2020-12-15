import axios from 'axios'

export const convertkitAxios = axios.create({
  baseURL: process.env.CONVERTKIT_BASE_URL,
})

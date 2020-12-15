import * as serverCookie from 'cookie'
import {CONVERTKIT_COOKIE_NAME} from './auth'

export default function serializeConvertkitCookie(subscriberId: string) {
  const hour = 3600000
  const oneYear = 365 * 24 * hour
  return serverCookie.serialize(CONVERTKIT_COOKIE_NAME, subscriberId, {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    path: '/',
    maxAge: oneYear,
  })
}

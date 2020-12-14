import * as serverCookie from 'cookie'
import {ACCESS_TOKEN_KEY, CONVERTKIT_COOKIE_NAME} from './auth'

export default function getTokenFromCookieHeaders(serverCookies: string) {
  const parsedCookie = serverCookie.parse(serverCookies)
  const eggheadToken = parsedCookie[ACCESS_TOKEN_KEY] || ''
  const convertkitId = parsedCookie[CONVERTKIT_COOKIE_NAME] || ''
  return {convertkitId, eggheadToken, loginRequired: eggheadToken.length <= 0}
}

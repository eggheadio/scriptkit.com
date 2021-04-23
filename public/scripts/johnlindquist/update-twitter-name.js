// Menu: Update Twitter Name
// Description: Change your name on twitter
// Author: John Lindquist
// Twitter: @johnlindquist

let Twitter = await npm('twitter-lite')

let envOptions = {
  hint: md(
    `You need to [create an app](https://developer.twitter.com/en/apps) to get these keys/tokens`,
  ),
  ignoreBlur: true,
  secret: true,
}

let client = new Twitter({
  consumer_key: await env('TWITTER_CONSUMER_KEY', envOptions),
  consumer_secret: await env('TWITTER_CONSUMER_SECRET', envOptions),
  access_token_key: await env('TWITTER_ACCESS_TOKEN_KEY', envOptions),
  access_token_secret: await env('TWITTER_ACCESS_TOKEN_SECRET', envOptions),
})

let name = await arg('Enter new twitter name:')

let response = await client
  .post('account/update_profile', {
    name,
  })
  .catch((error) => console.log(error))

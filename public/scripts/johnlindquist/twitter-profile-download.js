let {default: Twitter} = await need('twitter')
let client = new Twitter({
  consumer_key: await env('TWITTER_CONSUMER_KEY'),
  consumer_secret: await env('TWITTER_CONSUMER_SECRET'),
  access_token_key: await env('TWITTER_ACCESS_TOKEN_KEY'),
  access_token_secret: await env('TWITTER_ACCESS_TOKEN_SECRET'),
})

let screen_name = await arg('Enter twitter username:')
console.log(screen_name)

client.get('users/show', {screen_name}, (err, data) => {
  let url = data.profile_image_url_https.replace('_normal', '')

  console.log(url)
  copy(url)
})

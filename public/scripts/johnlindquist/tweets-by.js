let {default: Twitter} = await need('twitter')

let username = await arg('Enter a twitter username:')
let tweetsFile = path.join(env.SIMPLE_PATH, 'out', username + '-tweets.txt')

console.log(tweetsFile)
let stream = createWriteStream(tweetsFile, {
  flags: 'a',
})

let client = new Twitter({
  consumer_key: await env('TWITTER_CONSUMER_KEY'),
  consumer_secret: await env('TWITTER_CONSUMER_SECRET'),
  access_token_key: await env('TWITTER_ACCESS_TOKEN_KEY'),
  access_token_secret: await env('TWITTER_ACCESS_TOKEN_SECRET'),
})

let i = 0
let batch = 1
let prevIdString = ''

let getTweets = (id_str) => {
  let params = {
    screen_name: username,
    count: 200,
    include_rts: false,
    max_id: id_str,
    tweet_mode: 'extended',
    stringify_ids: true,
  }
  client.get(
    'statuses/user_timeline',
    params,
    function (error, tweets, response) {
      i += tweets.length
      if (error) console.log(error)
      if (!error) {
        tweets.forEach((tweet) => {
          let {full_text, created_at, id} = tweet
          writeToFile(full_text)
        })
        let oldest = tweets[tweets.length - 1]
        console.log(i, tweets.length)
        // console.log(oldest)
        let {id_str} = oldest
        if (id_str == prevIdString) return
        if (id_str && i < batch * 3000) {
          getTweets(id_str)
          prevIdString = id_str
          console.log(id_str)
        } else {
          setTimeout(() => {
            batch++
            console.log('starting next batch', id_str, i, batch)
            getTweets(id_str)
          }, 1000 * 30)
        }
      }
    },
  )
}

let writeToFile = (value) => {
  // console.log("write to file")
  // console.log("-----------------------")
  // console.log("->", value)
  stream.write(value + '\n')
}

getTweets()

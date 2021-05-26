// Menu: Reddit
// Description: Browse Reddit from Script Kit
// Author: John Lindquist
// Twitter: @johnlindquist

let Reddit = await npm('reddit')

let envOptions = {
  ignoreBlur: true,
  hint: md(`[Create a reddit app](https://www.reddit.com/prefs/apps)`),
  secret: true,
}

let reddit = new Reddit({
  username: await env('REDDIT_USERNAME'),
  password: await env('REDDIT_PASSWORD'),
  appId: await env('REDDIT_APP_ID', envOptions),
  appSecret: await env('REDDIT_APP_SECRET', envOptions),
  userAgent: `ScriptKit/1.0.0 (https://scriptkit.com)`,
})

let subreddits = [
  'funny',
  'aww',
  'dataisbeautiful',
  'mildlyinteresting',
  'RocketLeague',
]

subreddits.forEach((sub) => {
  onTab(sub, async () => {
    await arg('Select post to open:', async () => {
      let best = await reddit.get(`/r/${sub}/hot`)

      return best.data.children.map(({data}) => {
        let {title, thumbnail, url, subreddit_name_prefixed, preview} = data

        let resolutions = preview?.images?.[0]?.resolutions
        let previewImage = resolutions?.[resolutions?.length - 1]?.url

        return {
          name: title,
          description: subreddit_name_prefixed,
          value: url,
          img: thumbnail,
          ...(previewImage && {
            preview: md(`
![${title}](${previewImage})

### ${title}          
                `),
          }),
        }
      })
    })
  })
})

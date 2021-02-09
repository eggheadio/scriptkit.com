// Menu: Dev Env for simplescripts.env
// Description: This probably won't run on your machine 😜
// Author: John Lindquist
// Twitter: @johnlindquist

exec(`code ~/projects/simplescripts.dev`)
iterm(`cd ~/projects/simplescripts.dev; vercel dev`)
await simple('chrome-tab', 'localhost:3000')

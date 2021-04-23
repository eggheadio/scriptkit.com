// Menu: John's personal startup script for scriptkit.com
// Description: This probably won't run on your machine 😜
// Author: John Lindquist
// Twitter: @johnlindquist

exec(`code ~/projects/scriptkit.com`)
iterm(`cd ~/projects/scriptkit.com; vercel dev`)
await kit('chrome-tab', 'localhost:3000')

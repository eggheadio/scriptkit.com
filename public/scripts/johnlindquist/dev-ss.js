// Menu: John's personal startup script for scriptkit.app
// Description: This probably won't run on your machine 😜
// Author: John Lindquist
// Twitter: @johnlindquist

exec(`code ~/projects/scriptkit.app`)
iterm(`cd ~/projects/scriptkit.app; vercel dev`)
await kit('chrome-tab', 'localhost:3000')

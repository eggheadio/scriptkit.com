// Menu: Dad Joke
// Description: Logs out a Dad Joke from icanhazdadjoke.com
// Author: John Lindquist
// Twitter: @johnlindquist

let {say} = await kit('speech')

let response = await get(`https://icanhazdadjoke.com/`, {
  headers: {
    Accept: 'text/plain',
  },
})

console.log(response.data)
say(response.data)

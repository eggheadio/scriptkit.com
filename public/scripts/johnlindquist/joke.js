// Menu: Dad Joke
// Description: Logs out a Dad Joke from icanhazdadjoke.com
// Author: John Lindquist
// Twitter: @johnlindquist

let response = await get(`https://icanhazdadjoke.com/`, {
  headers: {
    Accept: 'text/plain',
  },
})

show(response.data)
say(response.data)

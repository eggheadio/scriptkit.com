// Menu: Hello World
// Description: Enter an name, speak it back
// Author: John Lindquist
// Twitter: @johnlindquist

let {say} = await kit('speech')
let name = await arg(`What's your name?`)
say(`Hello, ${name}!`)

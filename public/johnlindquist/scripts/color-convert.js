// Menu: Convert Colors
// Description: Converts colors between rgb, hex, etc
// Author: John Lindquist
// Twitter: @johnlindquist

let {setSelectedText} = await kit('text')
let convert = await npm('color-convert')

let createChoice = (type, value, input) => {
  return {
    name: type + ': ' + value,
    value,
    html: `<div class="h-full w-full p-1 text-xs flex justify-center items-center font-bold" style="background-color:${input}">
      <span>${input}</span>
      </div>`,
  }
}

//using a function with "input" allows you to generate values
let conversion = await arg('Enter color:', (input) => {
  if (input.startsWith('#')) {
    return ['rgb', 'cmyk', 'hsl'].map((type) => {
      let value = convert.hex[type](input).toString()
      return createChoice(type, value, input)
    })
  }

  //two or more lowercase
  if (input.match(/^[a-z]{2,}/)) {
    return ['rgb', 'hex', 'cmyk', 'hsl']
      .map((type) => {
        try {
          let value = convert.keyword[type](input).toString()

          return createChoice(type, value, input)
        } catch (error) {
          return ''
        }
      })
      .filter(Boolean)
  }

  return []
})

setSelectedText(conversion)

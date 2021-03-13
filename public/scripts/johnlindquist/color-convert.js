// Menu: Convert Colors
// Description: Converts colors between rgb, hex, etc
// Author: John Lindquist
// Twitter: @johnlindquist

let {setSelectedText} = await kit('text')
let convert = await npm('color-convert')

//using a function with "input" allows you to generate values
let conversion = await arg('Enter color:', (input) => {
  if (input.startsWith('#')) {
    return ['rgb', 'cmyk', 'hsl'].map((type) => {
      let value = convert.hex[type](input).toString()

      return {
        name: type + ': ' + value,
        value,
        info: `<div style="background-color:${input}; width:100px; height:100px;">
          ${input}
          </div>`,
      }
    })
  }

  //two or more lowercase
  if (input.match(/^[a-z]{2,}/)) {
    return ['rgb', 'hex', 'cmyk', 'hsl']
      .map((type) => {
        try {
          let value = convert.keyword[type](input).toString()

          return {
            name: type + ': ' + value,
            value,
            info: `<div style="background-color:${input}">
              ${input}
              </div>`,
          }
        } catch (error) {
          return ''
        }
      })
      .filter(Boolean)
  }

  return []
})

setSelectedText(conversion)

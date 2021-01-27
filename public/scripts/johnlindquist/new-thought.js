// Menu: New Journal Entry
// Description: Generate a file using the current date in a specified folder
// Author: John Lindquist
// Twitter: @johnlindquist
let {format} = await npm('date-fns')

let date = format(new Date(), 'yyyy-MM-dd')
let thoughtFile = path.join(await env('THOUGHTS_PATH'), date + '.md')
edit(thoughtFile, env?.THOUGHTS_PATH)

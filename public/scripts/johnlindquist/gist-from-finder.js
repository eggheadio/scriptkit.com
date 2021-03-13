// Menu: Gist from Finder
// Description: Select a file in Finder, then create a Gist
// Author: John Lindquist
// Twitter: @johnlindquist

let {getSelectedFile} = await kit('file')
let filePath = await getSelectedFile()
let file = filePath.split('/').pop()

let isPublic = await arg('Should the gist be public?', [
  {name: 'Yes', value: true},
  {name: 'No', value: false},
])

const body = {
  files: {
    [file]: {
      content: await readFile(filePath, 'utf8'),
    },
  },
}

if (isPublic) body.public = true

let config = {
  headers: {
    Authorization:
      'Bearer ' +
      (await env('GITHUB_GIST_TOKEN', {
        info: `Create a gist token: <a class="bg-white" href="https://github.com/settings/tokens/new">https://github.com/settings/tokens/new</a>`,
        message: `Set .env GITHUB_GIST_TOKEN:`,
      })),
  },
}
const response = await post(`https://api.github.com/gists`, body, config)

exec(`open ` + response.data.html_url)

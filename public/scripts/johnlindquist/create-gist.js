//Description: Create a gist from a selected file

let basePath = cwd()
let filePath = await arg('Select a file', {
  type: 'file',
  basePath,
})

filePath = path.join(basePath, filePath)
let file = _.last(filePath.split(path.sep))

let {value: isPublic} = await prompt({
  message: 'Should the gist be public?',
  type: 'confirm',
})

const body = {
  files: {
    [file]: {
      content: await readFile(filePath, 'utf8'),
    },
  },
  public: isPublic,
}

let config = {
  headers: {
    Authorization:
      'Bearer ' +
      (await env('GITHUB_GIST_TOKEN', {
        message: chalk`
> Create a gist token: https://github.com/settings/tokens/new      
Set env {yellow GITHUB_GIST_TOKEN}:`,
      })),
  },
}
const response = await post(`https://api.github.com/gists`, body, config)

console.log(response.data.html_url)
exec(`open ` + response.data.html_url)

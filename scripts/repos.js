let response = await get(`https://api.github.com/users/johnlindquist/repos`)

export default response.data.map((r) => r.url)

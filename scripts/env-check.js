let token = await env('VERCEL_ENV')

await div(token + " " + process.cwd())

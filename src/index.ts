export default {
  async fetch(request, env, ctx): Promise<Response> {
    const url = new URL(request.url)
    let path = url.pathname

    const sleepTime = url.searchParams.get('sleep')
    if (sleepTime) {
      await sleep(parseInt(sleepTime))
    }

    if (path === '/') {
      const repo = 'github.com/pydantic/demo-endpoints'
      const html = `\
<h1>demo-endpoints</h1>
<p>See <a href="https://${repo}">${repo}</a> for more information.</p>
`
      return new Response(html, { headers: { 'content-type': 'text/html' } })
    }

    while (path.endsWith('/')) {
      path = path.slice(0, -1)
    }

    if (path === '/number') {
      const min = parseInt(url.searchParams.get('min') || '1')
      const max = parseInt(url.searchParams.get('max') || '100')

      if (min > max) {
        return new Response('Error: min cannot be greater than max', { status: 400 })
      }

      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min
      return new Response(randomNumber.toString())
    }

    if (path === '/weather') {
      const weatherConditions = [
        'sunny',
        'cloudy',
        'raining',
        'snowing',
        'windy',
        'foggy',
        'stormy',
        'partly cloudy',
        'drizzling',
        'hailing',
      ]
      const randomWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)]
      return new Response(randomWeather)
    }

    if (path === '/latlng') {
      // Generate random latitude between -60 and 75 (most inhabited areas)
      const lat = Math.round((Math.random() * 135 - 60) * 10) / 10
      // Generate random longitude between -180 and 180
      const lng = Math.round((Math.random() * 360 - 180) * 10) / 10

      const coordinates = { lat, lng }
      return new Response(JSON.stringify(coordinates), {
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response('Not Found', { status: 404 })
  },
} satisfies ExportedHandler<Env>

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

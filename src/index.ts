export default {
  async fetch(request, env, ctx): Promise<Response> {
    const url = new URL(request.url)
    let path = url.pathname

    const sleepTime = url.searchParams.get('sleep')
    if (sleepTime) {
      await sleep(parseInt(sleepTime))
    }

    if (path === '/') {
      const sentences = [
        'The quick brown fox jumps over the lazy dog.',
        "Life is what happens when you're busy making other plans.",
        'In a hole in the ground there lived a hobbit.',
        'It was the best of times, it was the worst of times.',
        'All happy families are alike; each unhappy family is unhappy in its own way.',
        'The only way to do great work is to love what you do.',
        'Be yourself; everyone else is already taken.',
        'Two roads diverged in a wood, and I took the one less traveled by.',
        'To be or not to be, that is the question.',
        'The journey of a thousand miles begins with one step.',
      ]
      const randomSentence = sentences[Math.floor(Math.random() * sentences.length)]
      return new Response(randomSentence)
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

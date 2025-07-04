export default {
  async fetch(request, env, ctx): Promise<Response> {
    const url = new URL(request.url)
    const path = url.pathname

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

    return new Response('Not Found', { status: 404 })
  },
} satisfies ExportedHandler<Env>

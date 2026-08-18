export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    let response = await env.ASSETS.fetch(request)

    if (response.status === 404 && request.method === 'GET' && !url.pathname.includes('.')) {
      response = await env.ASSETS.fetch(new Request(new URL('/index.html', url), request))
    }

    const contentType = response.headers.get('content-type') || ''
    if (contentType.includes('text/html')) {
      const html = (await response.text()).replaceAll('__SITE_ORIGIN__', url.origin)
      const headers = new Headers(response.headers)
      headers.delete('content-length')
      return new Response(html, {
        status: response.status,
        statusText: response.statusText,
        headers,
      })
    }

    return response
  },
}

// This file was added by edgio init.
// You should commit this file to source control.
import { Router, edgioRoutes } from '@edgio/core'
import { starterRoutes } from '@edgio/starter'
import routeHomePageHandler  from './routeHomePageHandler'
import { CACHE_ASSETS } from './cache'
import { CACHE_PAGES } from './cache'

export default new Router()
  // Here is an example where we cache api/* at the edge but prevent caching in the browser
  // .match('/api/:path*', {
  //   caching: {
  //     max_age: '1d',
  //     stale_while_revalidate: '1h',
  //     bypass_client_cache: true,
  //     service_worker_max_age: '1d',
  //   },
  // })

 
  
  
    .match('/no-cache-proxy/(.*)', {
    caching: { bypass_client_cache: true, bypass_cache: true },
    origin: { set_origin: "origin" },
    url: {
      url_rewrite: [
        {
          source: "(?i)/no-cache-proxy/(.*)",
          destination: "/$1",
          syntax: "regexp",
        },
      ],
    },
  })
  
  .match('/:path*',routeHomePageHandler)
  
  
  .match('/cdn-entrance360/:path*', ({ cache, 
  									   removeUpstreamResponseHeader, 
  									   proxy, 
  									   setResponseHeader, 
  									   updateRequestHeader}) => {
    cache(CACHE_ASSETS)
    removeUpstreamResponseHeader('set-cookie') // The presence of a set-cookie header would prevent the response from being cached, so ensure set-cookie headers are removed.
  // proxy('origin', { transformResponse: transform }) // inject browser.ts into the document returned from the origin
  updateRequestHeader('referer', /http:\/\/localhost:3000/gi, 'https://cdn.entrance360.com')
  setResponseHeader('cache-control', 'public, max-age=10') // change the cache headers to be cachable
  console.log('test')
    return proxy('cdnentrance360', { path: '/:path*' })
  })
  
   // plugin enabling basic Edgio functionality
  
  
  .use(starterRoutes)


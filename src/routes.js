// This file was added by edgio init.
// You should commit this file to source control.
import { Router, edgioRoutes } from '@edgio/core'
import { starterRoutes } from '@edgio/starter'
import routeHomePageHandler  from './routeHomePageHandler'
import otherPageHandlers from './otherPageHandlers'
import { CACHE_ASSETS } from './cache'
import { CACHE_PAGES } from './cache'

export default new Router()

  .match('/', routeHomePageHandler) // only for home page
  
  .match({ path: '/(.*)',
  		   headers: { cookie: {not : /sessionid/} },
  		   method: { not: "POST" } }, otherPageHandlers)

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
  
  .match('/login', {
    caching: { bypass_cache: true , bypass_client_cache: true},
    comment: "no cache for /login page",
  })
  
  .match('/logout', {
    caching: { bypass_cache: true , bypass_client_cache: true},
    origin: { set_origin: "origin" },
    comment: "no cache for /logout page",
  })
  
  .match('/(.*)/order-summary/', {
    caching: { bypass_cache: true },
    headers: {
      set_response_headers: { "X-Message": "order-summary-detected" },
    },
  })
  
  .match({ path: '/(.*)',
  		   method: "POST" }, {
    caching: { bypass_cache: true , bypass_client_cache: true},
    comment: "no cache for POST requests",
  })
  
  .match(
    { headers: { cookie: /sessionid/ } },
    { caching: { bypass_cache: true , bypass_client_cache: true},
    	headers: {
        set_response_headers: { "X-Message": "no-cache-cookie-detected" },
      } }
  )
  
  .use(starterRoutes)

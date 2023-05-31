import { CACHE_PAGES } from './cache'
import { RouteHandler } from '@edgio/core/router/Router'
import * as cheerio from 'cheerio'
import { injectBrowserScript, starterRoutes } from "@edgio/starter";
import responseBodyToString from "@edgio/core/utils/responseBodyToString";
import { CACHE_PAGES } from './cache'

const handler: RouteHandler = async ({ proxy,cache }) => {
cache(CACHE_PAGES)
proxy("origin", {
      transformResponse: (res, req) => {
      console.log('entered transform')
        
          injectBrowserScript(res);
          
          //
          const $ = cheerio.load(res.body);
          $("head").append(
            `<script src="/main.js" defer="defer"></script>`
          );
          //res.body = $.html();
          //res.body = $.html().replace(/https?:\/\/gracobaby\.eu\//g, '/');
          //console.log(res.body)
          res.body = $.html()
          //.replace(/https?:\/\/www\.careers360\.com\//g, '/')
          .replace(/https?:\/\/learn\.careers360\.com\//g, '/')
          .replace(/https?:\/\/cdn\.entrance360\.com\//g, '/cdn-entrance360/') 
          //.replace(/https?:\/\/static\.cars24\.com\//g, '/edg-static/') 
          //.replace(/https?:\/\/fastly-production\.24c\.in\//g, '/f24c-images/')
          //
          }
          })
          
}

export default handler
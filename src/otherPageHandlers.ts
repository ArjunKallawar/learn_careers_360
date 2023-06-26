import { CACHE_PAGES } from './cache'
import { RouteHandler } from '@edgio/core/router/Router'
import * as cheerio from 'cheerio'
import fetch from 'node-fetch'
import { injectBrowserScript, starterRoutes } from "@edgio/starter";
import responseBodyToString from "@edgio/core/utils/responseBodyToString";
import { CACHE_PAGES } from './cache'

const handler: RouteHandler = async ({ proxy,cache }) => {
cache(CACHE_PAGES)
proxy("origin", {
      transformResponse: (res, req) => {
      
      		injectBrowserScript(res)
			
          	const $ = cheerio.load(res.body);
          	
          	
          	res.body = $.html()
          				.replace(/https?:\/\/www\.careers360\.com\//g, '/')
          				.replace(/https?:\/\/learn\.careers360\.com\//g, '/')
          				.replace(/https?:\/\/cdn\.entrance360\.com\//g, '/cdn-entrance360/')
          				
          }
          })
          
          
          }
          






export default handler
import { CustomCacheKey } from '@edgio/core/router'

const ONE_HOUR = 60 * 60
const SIX_HOURS = 6 * ONE_HOUR
const ONE_DAY = 24 * ONE_HOUR
const TWO_DAYS = 2 * ONE_DAY

/**
 * The default cache setting for pages in the shopping flow
 */
export const CACHE_PAGES = {
    /*key: new CustomCacheKey().excludeQueryParameters('search_query', 'link', 'email', 'utm_source', 'utm_campaign', 'utm_medium', 
    'product_id', 'checkoutId', 'utm_content', 'utm_term', 'catci', 'wishlistid', 'CAPCID', 'CAWELAID', 'caagid', 'catrk',
    'from', 'amp', 'added_product_id', 'utm_medium%5B0%5D', 'utm_source%5B1%5D', 'utm_medium%5B1%5D', 'agid', 'code', 'msclkid%5B1%5D', 
    'utm_term%5B0%5D', 'utm_content%5B1%5D', 'msclkid%5B0%5D', 'utm_content%5B0%5D', 'utm_term%5B1%5D', 'g', 'item_id', 'country_id', 
    'zip_code', 'order_id', 'state_id', 'rsd', 'fbclid', 's_kwcid', 'p', 'CA_6C15C', 'bestmetaltree'),*/
    edge: {
        maxAgeSeconds: TWO_DAYS,
        staleWhileRevalidateSeconds: TWO_DAYS,
        forcePrivateCaching: true // Force caching of `private` responses
    },
    browser: {
        maxAgeSeconds: 0,
        serviceWorkerSeconds: ONE_HOUR,
    },
}

/**
 * The default cache setting for static assets like JS, CSS, and images.
 */
export const CACHE_ASSETS = {
    edge: {
        maxAgeSeconds: TWO_DAYS,
        forcePrivateCaching: true // Force caching of `private` responses
    },
    browser: {
        maxAgeSeconds: 0,
        serviceWorkerSeconds: ONE_DAY,
    },
}


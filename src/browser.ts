import installDevtools from '@edgio/devtools/install'
import install from '@edgio/prefetch/window/install';
import { prefetch } from '@edgio/prefetch/window/prefetch'

document.addEventListener('DOMContentLoaded', function () {
installDevtools()

let url = window.location.href
let hostname = window.location.hostname
let port = window.location.port


//For production
//comment out for local testing
//url = url.replace(hostname, hostname+'/no-cache-proxy')

//For dev and local testing 
//comment for production
url = url.replace(hostname+':'+port, hostname+':'+port +'/no-cache-proxy')

fetch(url)
install({
			watch : [
						{
						selector : 'li#domain-learn-li.domain-learn-careers360-com a',
						callback: (el) => { 
												console.log('attempted prefetch 2')
												prefetch(el.getAttribute('href'),'fetch')
												console.log('attempted prefetch 2')
												
											},
						}
			]
		})
		
})
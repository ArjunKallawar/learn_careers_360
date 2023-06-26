import installDevtools from '@edgio/devtools/install'
import install from '@edgio/prefetch/window/install';
import { prefetch } from '@edgio/prefetch/window/prefetch'


async function lateLoadCSRFToken() {
	let response =  await fetch('https://learn.careers360.net/middleware-csrf-token/?render_tag=1')
	let tokenCSRF = await response.text()
	
	$('.form-group input[name=csrfmiddlewaretoken]').val(tokenCSRF)


}


document.addEventListener('DOMContentLoaded', function () {
installDevtools()

//let url = window.location.href
//let hostname = window.location.hostname
//let port = window.location.port
//url = url.replace(hostname+':'+port, hostname+':'+port +'/no-cache-proxy')

install({
			watch : [
						{
						selector : 'li#domain-learn-li.domain-learn-careers360-com a',
						callback: (el) => { 
												prefetch(el.getAttribute('href'),'fetch')
											},
						},
						{
						selector : '.cuet_btn',
						callback: (el) => { 
												prefetch(el.getAttribute('href'),'fetch')
											},
						},
						{
						selector : '.qnabtn a',
						callback: (el) => { 
												prefetch(el.getAttribute('href'),'fetch')
											},
						}
			]
		})
lateLoadCSRFToken();		
})
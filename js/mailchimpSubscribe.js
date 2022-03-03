import { grecaptchaSiteKey, verifyReCaptchaV3 } from './main.js'

const mailChimpSubscribeElement = document.querySelector('#mc-embedded-subscribe-form')

const mcSubscribe = (e) => {
	e.preventDefault()
	grecaptcha.ready(function() {
		grecaptcha.execute(grecaptchaSiteKey, {action: 'mcSubscribeForm'}).then(async function(token) {
			const isHuman = await verifyReCaptchaV3(token)
			if (!isHuman) return alert('Request verification failed')
			const form = $('#mc-embedded-subscribe-form')
			$.ajax({
				type: 'GET',
				contentType: 'application/json',
				url: form.attr('action'),
				data: form.serialize(),
				dataType: 'jsonp',
				jsonp: 'c',
				cache: false,
				error: (e) => console.log(e),
				success: (data) => {
					if (data.result === 'success') {
						$('#mc-update-message').css({ display: 'block', color: 'green' })
						$('#mc-embedded-subscribe-form').css({ display: 'none' })
						$('#mc-update-message').html('Thank you for subscribing!')
					} else {
						$('#mc-update-message').css({ display: 'block', color: 'red' })
						$('#mc-update-message').html(data.msg.includes('already subscribed') === true ? 'You are already subscribed.' : 'Failed to subscribe due to an error. Please try again later.')
					}
				}
			})
		})
	})
}

mailChimpSubscribeElement.addEventListener('submit', mcSubscribe)
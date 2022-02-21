import { inputEditor, outputEditor } from '../codemirror.js'
import { translateCode } from './translateCode.js'
import { grecaptchaSiteKey } from '../main.js'

export const translateTextAction = (e) => {
	e.preventDefault();
	if (document.querySelector('#fromLang').value === 'text') return alert('Please select a language to translate from')
	if (document.querySelector('#toLang').value === 'text') return alert('Please select a language to translate to')
	grecaptcha.ready(function() {
		grecaptcha.execute(grecaptchaSiteKey, {action: 'submit'}).then(async function(token) {
			const leftSide = inputEditor.getValue()
			const rightSide = outputEditor.getValue()
			outputEditor.setValue('Waiting...')
			const translation = await translateCode(rightSide, leftSide, document.querySelector('#fromLang').value, document.querySelector('#toLang').value)
			!translation.error ? outputEditor.setValue(translation) : 
				outputEditor.setValue('Still waiting......')
		})
	})
}
import { inputEditor, outputEditor } from '../codemirror.js'
import { grecaptchaSiteKey } from '../main.js'

export const clearText = (e) => {
	e.preventDefault();
	grecaptcha.ready(function() {
		grecaptcha.execute(grecaptchaSiteKey, {action: 'submit'}).then(function(token) {
			inputEditor.setValue('')
			outputEditor.setValue('')
		});
	});
}
const codeMirrorConfig = {
	lineNumbers: true,
	lineWrapping: true,
	indentUnit: 4,
	matchBrackets: true,
	autoCloseBrackets: true,
	showTrailingSpace: true,
	theme: 'yonce',
}

export const inputEditor = CodeMirror.fromTextArea(document.querySelector('#inputText'), {
	...codeMirrorConfig,
	mode: 'text'
})

export const outputEditor = CodeMirror.fromTextArea(document.querySelector('#outputText'), {
	...codeMirrorConfig,
	mode: 'text'
})
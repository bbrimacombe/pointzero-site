import { inputEditor, outputEditor } from '../codemirror.js'

export const clearText = (e) => {
	e.preventDefault();
	inputEditor.setValue('')
	outputEditor.setValue('')
}
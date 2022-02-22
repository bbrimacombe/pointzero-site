import { getRandomInt } from './utils.js'
import { inputEditor, outputEditor } from './codemirror.js'

export const langs = [
	{ name: 'java', displayName: 'Java', mode: 'text/x-java'},
	{ name: 'python', displayName: 'Python', mode: 'text/x-python'},
	{ name: 'c', displayName: 'C', mode: 'text/x-csrc'},
	{ name: 'cpp', displayName: 'Cpp/C++', mode: 'text/x-c++src'},
	{ name: 'rust', displayName: 'Rust', mode: 'text/x-rustsrc'},
]

let langList = ""
if (langs.length) {
	langs.forEach((lang) => {
		langList += `<option value=${lang.name}>${lang.displayName}</option>`
	})
	document.querySelector('#fromLang').innerHTML = langList
	document.querySelector('#toLang').innerHTML = langList

	const fromLang = getRandomInt(0, langs.length)
	const toLang = getRandomInt(0, langs.length)
	document.querySelector('#fromLang').value = langs[fromLang].name
	document.querySelector('#toLang').value = langs[toLang].name
	inputEditor.setOption('mode', langs[fromLang].mode)
	outputEditor.setOption('mode', langs[toLang].mode)
}
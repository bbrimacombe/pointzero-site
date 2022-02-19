export const langs = [
	{ name: 'text', displayName: 'Select Language', mode: 'text'},
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
} else {
	document.querySelector('#fromLang').innerHTML = `<option value="none">No Languages</option>`
	document.querySelector('#toLang').innerHTML = `<option value="none">No Languages</option>`
}
const codeMirrorConfig = {
	lineNumbers: true,
	lineWrapping: true,
	indentUnit: 4,
	matchBrackets: true,
	autoCloseBrackets: true,
	showTrailingSpace: true,
	theme: 'yonce',
}

/* ***************
<div class="column-right" id="outputContainer">
    <div style="width: 100%">
    <textarea id="outputText" class="codemirror-textarea">Output Code Here</textarea>
    </div>
</div>
   *************** */

const width = window.innerWidth
const isMobile = width <= 600 ? true : false
const targetOutputElement = isMobile === true ? document.querySelector('#outputMobile') : document.querySelector('#outputDesktop')
const docFrag = document.createDocumentFragment()
const columnRightDiv = document.createElement('div')

columnRightDiv.classList.add('column-right')
columnRightDiv.id = 'outputContainer'
docFrag.appendChild(columnRightDiv)

const innerDiv = document.createElement('div')
innerDiv.style.width = '100%'
columnRightDiv.appendChild(innerDiv)

const outputTextArea = document.createElement('textarea')
outputTextArea.id = 'outputText'
outputTextArea.classList.add('codemirror-textarea')
innerDiv.appendChild(outputTextArea)
targetOutputElement.appendChild(docFrag)

export const inputEditor = CodeMirror.fromTextArea(document.querySelector('#inputText'), {
	...codeMirrorConfig,
	mode: 'text'
})

export const outputEditor = CodeMirror.fromTextArea(document.querySelector('#outputText'), {
	...codeMirrorConfig,
	mode: 'text'
})
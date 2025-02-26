import { langByExtension } from './samples/sampleData.js'
import { inputEditor } from './codemirror.js'
import { onLangChange } from './samples/onLangChange.js'

export const uploadCodeElement = document.querySelector('#uploadCode')

uploadCodeElement.addEventListener('change', (e) => {
    const fakePath = uploadCodeElement.value
    const fileName = fakePath.split('\\').pop()
    const fileExt = fileName.split('.').pop()
    const getLangByExt = langByExtension.filter((fileByExt) => fileByExt.fileExt === fileExt)
    if (!getLangByExt.length) return alert('File extension not supported')
    const fromLang = document.querySelector('#fromLang').value
    if (fromLang !== getLangByExt[0].lang) {
        document.querySelector('#fromLang').value = getLangByExt[0].lang
        onLangChange(getLangByExt[0].lang)
    }
    const input = e.target
    if (!'files' in input || input.files.length <= 0) return alert('Invalid file upload')
    const file = input.files[0]
    const reader = new FileReader()
    reader.onload = (eReader) => inputEditor.setValue(eReader.target.result)
    reader.onerror = (err) => console.log(err)
    reader.readAsText(file)
})
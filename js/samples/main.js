import { onLangChange } from './onLangChange.js'
import { updateSample } from './updateSample.js'
import { langs } from '../langs.js'
import { outputEditor } from '../codemirror.js'

document.querySelector('#fromLang').addEventListener('change', () => {
    const fromLang = document.querySelector('#fromLang').value
    onLangChange(fromLang)
})

document.querySelector('#toLang').addEventListener('change', () => {
    const toLang = document.querySelector('#toLang').value
    outputEditor.setOption('mode', langs.filter((lang) => lang.name === toLang)[0].mode)
})

document.querySelector('#samplesList').addEventListener('change', () => {
    const sampleName = document.querySelector('#samplesList').value
    updateSample(sampleName)
})
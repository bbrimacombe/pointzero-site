import { sampleData } from './sampleData.js'
import { updateSample } from './updateSample.js'
import { langs } from '../langs.js'
import { inputEditor } from '../codemirror.js'

export const onLangChange = (fromLang) => {
    inputEditor.setOption('mode', langs.filter((lang) => lang.name === fromLang)[0].mode)
    let sampleNames = []
    sampleData.forEach((sample) => {
        if (sample.fromLang === fromLang) {
            const displayName = sample.displayName
            const name = sample.name
            sampleNames.push({displayName, name})
        }
    })
    let newSampleList = ""
    if (sampleNames.length) {
        sampleNames.forEach((sample) => {
            newSampleList += `<option value=${sample.name}>${sample.displayName}</option>`
        })
        document.querySelector('#samplesList').innerHTML = newSampleList
        updateSample(sampleNames[0].name)
    } else {
        document.querySelector('#samplesList').innerHTML = `<option value="none">No Samples</option>`
        updateSample('none')
    }
}
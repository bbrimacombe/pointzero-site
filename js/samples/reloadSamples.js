import { sampleData } from './sampleData.js'
import { updateSample } from './updateSample.js'

export const reloadSamples = () => {
    const fromLang = document.querySelector('#fromLang').value
    let sampleNames = []
    sampleData.forEach((sample) => {
        if (sample.fromLang === fromLang) {
            const displayName = sample.displayName
            const name = sample.name
            sampleNames.push({displayName, name})
        }
    })
    let newSampleList = '<option value="none">Custom</option>\n<option value="upload">Upload Code</option>'
    if (sampleNames.length) {
        sampleNames.forEach((sample) => {
            newSampleList += `<option value=${sample.name}>${sample.displayName}</option>`
        })
    }
    document.querySelector('#samplesList').innerHTML = newSampleList
    updateSample('none')
}
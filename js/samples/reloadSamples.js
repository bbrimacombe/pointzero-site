import { getRandomInt } from '../utils.js'
import { updateSample } from './updateSample.js'

export const reloadSamples = (sampleData) => {
    if (!sampleData.length) return false
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
        const sample = getRandomInt(0, sampleNames.length)
        document.querySelector('#samplesList').innerHTML = newSampleList
        document.querySelector('#samplesList').value = sampleNames[sample].name
        updateSample(sampleNames[sample].name)
    } else {
        document.querySelector('#samplesList').innerHTML = newSampleList
        updateSample('none')
    }
}
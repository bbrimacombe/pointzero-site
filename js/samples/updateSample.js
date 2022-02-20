import { sampleData } from './sampleData.js'
import { inputEditor, outputEditor } from '../codemirror.js'

export const updateSample = (sampleName) => {
    if (sampleName === 'none' || sampleName === 'upload') {
        inputEditor.setValue('Enter code here')
        outputEditor.setValue('Waiting...')
        return false
    }
    console.log(sampleName)
    const fromCode = sampleData.filter((sample) => sample.name === sampleName)[0].fromCode
    inputEditor.setValue(fromCode)
    outputEditor.setValue('Waiting...')
}
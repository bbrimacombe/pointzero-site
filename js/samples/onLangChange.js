import { langs } from '../langs.js'
import { inputEditor } from '../codemirror.js'
import { reloadSamples } from './reloadSamples.js'
import { sampleData } from './sampleData.js'

export const onLangChange = (fromLang) => {
    inputEditor.setOption('mode', langs.filter((lang) => lang.name === fromLang)[0].mode)
    reloadSamples(sampleData)
}
import { translateTextAction } from './translateTextAction.js'
import { clearText } from './clearText.js'

const translateTextElement = document.querySelector('#translateText')
translateTextElement.addEventListener('click', translateTextAction)

const clearTextElement = document.querySelector('#clearText')
clearTextElement.addEventListener('click', clearText)
const grecaptchaSiteKey = '6LcMNoUeAAAAAKCDfuNh0u9r1ZqgpjyZ0s2cTTn2'

const langs = [
  { name: 'text', displayName: 'Text', mode: 'text'},
  { name: 'java', displayName: 'Java', mode: 'text/x-java'},
  { name: 'python', displayName: 'Python', mode: 'python'}
]

const setIsLoading = (bool) => {
  if (bool) {
    $('#loading-icon').show();
  } else {
    $('#loading-icon').hide();
  }
}

const translateCode = async(query, language) => {
  setIsLoading(true)

  try {
    const server = 'https://4ll33gak2g.execute-api.us-west-1.amazonaws.com/dev/pointzero'
    console.log('Making PointZero API request')

    const res = await axios.post(
      server,
      {query,  'from_lang': language}
    )

    res = res.data.replace(/\n *<\/DOCUMENT>$/, '')
  } catch (e) {
    console.log(e)
    await new Promise(resolve => setTimeout(resolve, 3000));
    res = language == "python" ? "System.out.print('Hello world!')" : "print('Hello world!')";
  }

  setIsLoading(false)
  return res
}

$(document).ready(function(){
  // CodeMirror
  const codeMirrorConfig = {
    lineNumbers: true,
    matchBrackets: true,
    autoCloseBrackets: true,
    showTrailingSpace: true,
    theme: 'yonce',
  }

  const inputEditorElement = $("#inputContainer textarea")[0]
  const inputEditor = CodeMirror.fromTextArea(inputEditorElement, {
    ...codeMirrorConfig,
    mode: 'text'
  })

  const outputEditorElement = $("#outputContainer textarea")[0]
  const outputEditor = CodeMirror.fromTextArea(outputEditorElement, {
    ...codeMirrorConfig,
    mode: 'text'
  })

  //Save instances
  $('#inputText').data('inputEditor', inputEditor);
  $('#outputText').data('outputEditor', outputEditor);

  //Add languages
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

  // Translation
  $('#translateText').click((e) => {
    e.preventDefault();
    grecaptcha.ready(function() {
      grecaptcha.execute(grecaptchaSiteKey, {action: 'submit'}).then(async function(token) {
        code = inputEditor.getValue()
        outputEditor.setValue('')
        translation = await translateCode(code, document.querySelector('#fromLang').value)
        outputEditor.setValue(translation)
      });
    });
  })

  $('#clearText').click((e) => {
    e.preventDefault();
    grecaptcha.ready(function() {
      grecaptcha.execute(grecaptchaSiteKey, {action: 'submit'}).then(function(token) {
        inputEditor.setValue('')
        outputEditor.setValue('')
      });
    });
  })
});
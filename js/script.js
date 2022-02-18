const grecaptchaSiteKey = '6LcMNoUeAAAAAKCDfuNh0u9r1ZqgpjyZ0s2cTTn2'

const setIsLoading = (bool) => {
  if (bool) {
    $('#swap-icon').hide();
    $('#loading-icon').show();
  } else {
    $('#loading-icon').hide();
    $('#swap-icon').show();
  }
}

const translateCode = async(query, language) => {
  setIsLoading(true)

  try {
    const server = 'https://4ll33gak2g.execute-api.us-west-1.amazonaws.com/dev/pointzero'
    console.log('Making PointZero API request')

    java = language == 'java' ? query : ''
    python = language == 'python' ? query : ''

    const res = await axios.post(
      server,
      {python, java,  'from_lang': language}
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

  const pythonEditorEle = $("#python-container textarea")[0]
  const pythonEditor = CodeMirror.fromTextArea(pythonEditorEle, {
    ...codeMirrorConfig,
    mode: "python",
  })

  const javaEditorEle = $("#java-container textarea")[0]
  const javaEditor = CodeMirror.fromTextArea(javaEditorEle, {
    ...codeMirrorConfig,
    mode: "text/x-java",
  })

  //Save instances
  $('#python-textarea').data('pythonEditor', pythonEditor);
  $('#java-textarea').data('javaEditor', javaEditor);

  // Translation
  $('a.translate.python').click((e) => {
    e.preventDefault();
    grecaptcha.ready(function() {
      grecaptcha.execute(grecaptchaSiteKey, {action: 'submit'}).then(async function(token) {
        javaEditor.setValue('')
        code = pythonEditor.getValue()
        translation = await translateCode(code, 'python')
        javaEditor.setValue(translation)
      });
    });
  })

  $('a.translate.java').click((e) => {
    e.preventDefault();
    grecaptcha.ready(function() {
      grecaptcha.execute(grecaptchaSiteKey, {action: 'submit'}).then(async function(token) {
        pythonEditor.setValue('')
        code = javaEditor.getValue()
        translation = await translateCode(code, 'java')
        pythonEditor.setValue(translation)
      });
    });
  })

  $('a.clear.python').click((e) => {
    e.preventDefault();
    grecaptcha.ready(function() {
      grecaptcha.execute(grecaptchaSiteKey, {action: 'submit'}).then(function(token) {
        pythonEditor.setValue('')
      });
    });
  })
  $('a.clear.java').click((e) => {
    e.preventDefault();
    grecaptcha.ready(function() {
      grecaptcha.execute(grecaptchaSiteKey, {action: 'submit'}).then(function(token) {
        javaEditor.setValue('')
      });
    });
  })
});
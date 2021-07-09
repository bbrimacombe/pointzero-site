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
  // event.preventDefault()
  setIsLoading(true)
  await new Promise(resolve => setTimeout(resolve, 3000));
  setIsLoading(false)
  return language == "python" ? "System.out.print('Hello world!')" : "print('Hello world!')";

  // const server = 'https://4ll33gak2g.execute-api.us-west-1.amazonaws.com/dev/pointzero'
  //const server = 'http://127.0.0.1:8000'
  console.log('Making PointZero API request')

  java = language == 'java' ? query : ''
  python = language == 'python' ? query : ''

  const res = await axios.post(
    server,
    {python, java,  'from_lang': language}
  )

  res.data = res.data.replace(/\n *<\/DOCUMENT>$/, '')

  return res.data
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

  // Translation
  $('a.translate.python').click(async() => {
    javaEditor.setValue('')
    code = pythonEditor.getValue()
    translation = await translateCode(code, 'python')
    javaEditor.setValue(translation)
  })

  $('a.translate.java').click(async() => {
    pythonEditor.setValue('')
    code = javaEditor.getValue()
    translation = await translateCode(code, 'java')
    pythonEditor.setValue(translation)
  })

  $('a.clear.python').click(() => pythonEditor.setValue(''))
  $('a.clear.java').click(() => javaEditor.setValue(''))
});

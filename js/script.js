const translateCode = async(query, language) => {
  // event.preventDefault()
  // setIsLoading(true)

  const server = 'https://4ll33gak2g.execute-api.us-west-1.amazonaws.com/dev/pointzero'
  //const server = 'http://127.0.0.1:8000'
  console.log('Making PointZero API request')

  java = language == 'java' ? query : ''
  python = language == 'python' ? query : ''

  const res = await axios.post(
    server,
    {python, java,  'from_lang': language}
  )

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
  $('#python-container a.translate').click(async() => {
    code = pythonEditor.getValue()
    translation = await translateCode(code, 'python')
    javaEditor.setValue(translation)
  })

  $('#java-container a.translate').click(async() => {
    code = javaEditor.getValue()
    translation = await translateCode(code, 'java')
    pythonEditor.setValue(translation)
  })
});

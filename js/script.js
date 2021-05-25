const translateCode = async(query, language) => {
  // event.preventDefault()
  // setIsLoading(true)

  const server = 'http://127.0.0.1:5000'
  console.log('Making PointZero API request')

  query = JSON.stringify(query)
  const res = await axios.get(`${server}/translate`, {params: {language, query}})

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
  $('#python-container button.translate').click(async() => {
    code = $('#python-container textarea').val()
    translation = await translateCode(code, 'python')
    javaEditor.setValue(translation)
  })

  $('#java-container button.translate').click(async() => {
    code = $('#java-container textarea').val()
    translation = await translateCode(code, 'java')
    pythonEditor.setValue(translation)
  })

});

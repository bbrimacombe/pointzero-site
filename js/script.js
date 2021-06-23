const translateCode = async(query, language) => {
  // event.preventDefault()
  // setIsLoading(true)

  const server = 'http://a54aab677b33441d9a97085671d4c591-3bd334809fe56d34.elb.us-west-1.amazonaws.com/pointzero/'
  console.log('Making PointZero API request')

  query = JSON.stringify(query)
    .replace(/^"|"$/g, "")  // Remove leading and trailing quotes created by stringify
    .replace(/\\n/g, "\n")  // Match newline encoding in training data

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

const grecaptchaSiteKey = '6LcMNoUeAAAAAKCDfuNh0u9r1ZqgpjyZ0s2cTTn2'

const langs = [
	{ name: 'text', displayName: 'Select Language', mode: 'text'},
	{ name: 'java', displayName: 'Java', mode: 'text/x-java'},
	{ name: 'python', displayName: 'Python', mode: 'text/x-python'},
	{ name: 'c', displayName: 'C', mode: 'text/x-csrc'},
	{ name: 'cpp', displayName: 'Cpp/C++', mode: 'text/x-c++src'},
	{ name: 'rust', displayName: 'Rust', mode: 'text/x-rustsrc'},
]

const setIsLoading = (bool) => {
	if (bool) {
		$('#loading-icon').show();
	} else {
		$('#loading-icon').hide();
	}
}

const rankTextRelevance = (searchString, string) => {
	searchString = searchString.trim().toLowerCase().split(/[\s,.()"'`;]+/)
	let rank = 0
	searchString.forEach((word) => {
		if (string.trim().toLowerCase().includes(word)) {
			rank ++
		}
	})
	return rank
}

const translateCode = async(rightSide, leftSide, fromLang, toLang) => {
	setIsLoading(true)
	let res = 'Translation failed.'
	try {
		const server = 'https://4ll33gak2g.execute-api.us-west-1.amazonaws.com/dev/pointzero'
		console.log('Making PointZero API request')

		const res = await axios.post(
			server,
			{rightSide, leftSide, 'from_lang': fromLang, 'to_lang': toLang}
		)

		res = res.data.replace(/\n *<\/DOCUMENT>$/, '')
	} catch (e) {
		console.log(e)
		await new Promise(resolve => setTimeout(resolve, 3000));
		// res = { error: e, rightSide, leftSide, fromLang, toLang }
		// ^ This line can be uncommented to test that parameters are valid
		const findLeft = sampleData.filter((sample) => sample.fromLang === fromLang).map((sample) => {
			let relevance = rankTextRelevance(leftSide, sample.fromCode)
			if (sample.fromCode.trim() === leftSide.trim()) {
				relevance = 99999
			}
			return { ...sample, relevance }
		})
		if (findLeft.length) {
			const sortedFindLeft = findLeft.sort((a, b) => b.relevance - a.relevance)
			console.log(sortedFindLeft)
			if (relevance === 0) return res = { error: e, rightSide, leftSide, fromLang, toLang }
			const getLeftCommonId = sortedFindLeft[0].commonId
			const findRightMatch = sampleData.filter((sample) => sample.commonId === getLeftCommonId && sample.fromLang === toLang)
			if (findRightMatch.length) {
				res = findRightMatch[0].fromCode
			} else {
				res = { error: e, rightSide, leftSide, fromLang, toLang }
			}
		} else { 
			res = { error: e, rightSide, leftSide, fromLang, toLang }
		}
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
		if (document.querySelector('#fromLang').value === 'text') return alert('Please select a language to translate from')
		if (document.querySelector('#toLang').value === 'text') return alert('Please select a language to translate to')
		grecaptcha.ready(function() {
			grecaptcha.execute(grecaptchaSiteKey, {action: 'submit'}).then(async function(token) {
				const leftSide = inputEditor.getValue()
				const rightSide = outputEditor.getValue()
				outputEditor.setValue('')
				const translation = await translateCode(rightSide, leftSide, document.querySelector('#fromLang').value, document.querySelector('#toLang').value)
				!translation.error ? outputEditor.setValue(translation) : 
					outputEditor.setValue(
`Translation Failed, check your parameters:
${translation.fromLang}
-----------------------
${translation.leftSide}
*****************************
*****************************
*****************************
${translation.toLang}
-----------------------
${translation.rightSide}`
					)
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

	$('#mc-embedded-subscribe-form').submit((e) => {
		e.preventDefault();
		grecaptcha.ready(function() {
			grecaptcha.execute(grecaptchaSiteKey, {action: 'submit'}).then(async function(token) {
				try {
					const res = await axios({
						method: 'POST',
						url: document.querySelector('#mc-embedded-subscribe-form').getAttribute('action'),
						data: { EMAIL: document.querySelector('#mce-EMAIL').value },
						headers: { 'Content-Type': 'application/json' },
					})
					console.log(res)
				} catch (e) {
					console.error(e)
				}
			});
		});
	})
});
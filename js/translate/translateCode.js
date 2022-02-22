import { rankTextRelevance } from '../utils.js'
import { sampleData } from '../samples/sampleData.js'
import { setIsLoading } from '../utils.js'
import { showSampleOutput } from '../main.js'

export const translateCode = async(rightSide, leftSide, fromLang, toLang) => {
	setIsLoading(true)
	let res
	try {
		const server = 'https://4ll33gak2g.execute-api.us-west-1.amazonaws.com/dev/pointzero'
		//const server = 'http://localhost:8080'
		console.log('Making PointZero API request')

		const reqData = { source: [leftSide], from_lang: fromLang, to_lang: toLang }
		if (typeof rightSide === 'string' && rightSide !== 'Still waiting......' && rightSide !== 'Waiting...' && rightSide.length > 0)
			reqData.hint = [rightSide]

		res = await axios.post(server, reqData)
		res = typeof res.data === 'string' ? res.data : res.data[0].replace(/\n *<\/DOCUMENT>$/, '')
	} catch (e) {
		console.log(e)
		if (showSampleOutput === true) {
			await new Promise(resolve => setTimeout(resolve, 3000));
			// res = { error: e, rightSide, leftSide, fromLang, toLang }
			// ^ This line can be uncommented to test that parameters are valid
			const findLeft = sampleData.filter((sample) => sample.fromLang === fromLang).map((sample) => {
				let relevance
				if (sample.fromCode.trim() === leftSide.trim()) {
					relevance = 99999
				} else relevance = rankTextRelevance(leftSide, sample.fromCode)
				return { ...sample, relevance }
			})
			if (findLeft.length) {
				const sortedFindLeft = findLeft.sort((a, b) => b.relevance - a.relevance)
				console.log(sortedFindLeft)
				if (sortedFindLeft[0].relevance < 10) return res = { error: e, rightSide, leftSide, fromLang, toLang }
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
		} else {
			res = { error: e, rightSide, leftSide, fromLang, toLang }
		}
	}

	setIsLoading(false)
	return res
}
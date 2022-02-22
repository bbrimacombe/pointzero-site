export const setIsLoading = (showLoading) => {
	if (showLoading) {
		document.querySelector('#loading-icon').style.visibility = 'visible'
	} else {
		document.querySelector('#loading-icon').style.visibility = 'hidden'
	}
}

export const rankTextRelevance = (searchString, string) => {
	searchString = searchString.trim().toLowerCase().split(/[\s,.()"'`;]+/)
	let rank = 0
	searchString.forEach((word) => {
		if (string.trim().toLowerCase().includes(word)) {
			rank ++
		}
	})
	return rank
}
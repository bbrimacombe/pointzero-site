export const setIsLoading = (bool) => {
	if (bool) {
		$('#loading-icon').show();
	} else {
		$('#loading-icon').hide();
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
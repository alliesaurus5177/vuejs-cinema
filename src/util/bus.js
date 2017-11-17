function checkFilter(category, title, checked) {
	if (checked) {
		this[category].push(title);
	}
	else {
		let index = this[category].indexOf(title);//returns -1 if not present 
		if (index > -1) {
			this[category].splice(index, 1);
		}
	}
}

export { checkFilter };
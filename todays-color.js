
// get color from the colors.json

export async function todayscolor() {
	const today = new Date()
	const firstday = new Date("2023-01-01")
	const numberofdays = Math.floor((today.getTime() - firstday.getTime()) / (1000 * 60 * 60 * 24));

	return await fetch("colors.json").then(response => response.json()).then(data => {

		// ------ getting colors

		let item = data[numberofdays]

		let red = item.red.toString(16)
		let green = item.green.toString(16)
		let blue = item.blue.toString(16)

		if (red.length < 2) {
			red = `0${red}`
		}
		if (green.length < 2) {
			green = `0${green}`
		}
		if (blue.length < 2) {
			blue = `0${blue}`
		}

		// ------ adding style

		let style = document.createElement('style');

		style.textContent = `#color {background-color: #${red}${green}${blue};}`;
		document.head.appendChild(style);

		return item
	})
}
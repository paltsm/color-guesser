import { setcookies, getcookies } from "./cookies.js";
import { todayscolor } from "./todays-color.js";

let color = await todayscolor()
let tries = 6
let above = { "red": 300, "green": 300, "blue": 300 }
let below = { "red": 0, "green": 0, "blue": 0 }


// cookies

let wins = getcookies("wins")
let loses = getcookies("loses")
let lastplayed = getcookies("lastplayed")
let today = new Date().toJSON().slice(0, 10)

// inputs

const RED = document.getElementById("red")
const GREEN = document.getElementById("green")
const BLUE = document.getElementById("blue")

// elements

const GUESS = document.getElementById("guess")
const STATS = document.getElementById("stats")
const WINS = document.getElementById("winnumber")
const LOSES = document.getElementById("losenumber")
WINS.innerText = parseInt(wins)
LOSES.innerText = parseInt(loses)

if (lastplayed == today) {
	disableinputs()
	GUESS.disabled = true
	STATS.style.display = "block"
}

// check if input only contains numbers

isinputnumber(RED)
isinputnumber(GREEN)
isinputnumber(BLUE)

let done = false

GUESS.addEventListener("click", () => {

	// check if input is lower/higher/correct

	checkinput(RED, color.red)
	checkinput(GREEN, color.green)
	checkinput(BLUE, color.blue)

	// previoustry(RED, GREEN, BLUE, color)

	// win

	if (RED.parentElement.classList.contains("correct") && GREEN.parentElement.classList.contains("correct") && BLUE.parentElement.classList.contains("correct")) {
		setcookies("wins", parseInt(wins) + 1)
		setcookies("lastplayed", today)
		GUESS.disabled = true
		STATS.style.display = "block"
		WINS.innerText = parseInt(wins) + 1
		WINS.classList.add("happened")
		done = true
		disableinputs()
	}

	// if you use all 6 tries, you lose

	const TRIES = document.getElementById("tries-left")
	tries--
	TRIES.innerText = tries

	// lose 

	if (tries == 0 && done == false) {
		setcookies("loses", parseInt(loses) + 1)
		setcookies("lastplayed", today)

		GUESS.disabled = true
		STATS.style.display = "block"
		LOSES.innerText = parseInt(loses) + 1
		LOSES.classList.add("happened")
		disableinputs()
	}

})

// check if input only contains numbers

function isinputnumber(c) {
	c.addEventListener("input", () => {
		if (/^\d+$/.test(c.value) == false) {
			c.value = ""
		} else if (c.value > 250) {
			c.value = 250
		}
	})
}

// is input lower/higher/correct

// function checkinput(input, todays) {
// 	input.parentElement.classList = ""
// 	let style = document.getElementById("prev")
// 	let funcabove
// 	let funcbelow

// 	if (input.parentElement.id == "reddiv") {
// 		funcabove = above.red
// 		funcbelow = below.red
// 	}

// 	if (input.parentElement.id == "greendiv") {
// 		funcabove = above.green
// 		funcbelow = below.green
// 	}
// 	if (input.parentElement.id == "bluediv") {
// 		funcabove = above.blue
// 		funcbelow = below.blue
// 	}

// 	if (todays > input.value) {

// 		input.parentElement.classList.add("below")

// 		if (parseInt(input.value) > funcbelow) {
// 			funcbelow = input.value
// 			style.innerHTML += `
// 			.previoustry::before {
// 				content: "${funcbelow}";
// 			}`
// 		}
// 	}
// 	else if (todays < input.value) {

// 		input.parentElement.classList.add("above")

// 		if (parseInt(input.value) < funcabove) {
// 			funcabove = input.value
// 			style.innerHTML += `
// 			.previoustry::after {
// 				content: "${funcabove}";
// 			}`
// 		}
// 	}
// 	else {
// 		input.parentElement.classList.add("correct")
// 	}
// }

// disable inputs

function disableinputs() {
	RED.disabled = true
	GREEN.disabled = true
	BLUE.disabled = true
}
// function previoustry(red, green, blue, color) {

// 	let style = document.getElementById("prev");

// 	// if (input.parentElement.classList.console)

// 	if (above.red > parseInt(red.value) && red.value > color.red) {
// 		console.log(above.red, red.value, color.red)
// 		above.red = red.value
// 		style.innerHTML += `
// 		#reddiv .previoustry::before {
// 			content: "${above.red}";
// 		}`
// 	}
// 	if (below.red < parseInt(red.value) && red.value < color.red) {
// 		console.log(below.red, red.value, color.red)
// 		below.red = red.value
// 		style.innerHTML += `
// 		#reddiv .previoustry::after {
// 			content: "${below.red}";
// 		}`
// 	}

// 	// burh

// 	if (above.green > green.value && green.value > color.green) {
// 		console.log(above.green, green.value, color.green)
// 		above.green = green.value
// 		style.innerHTML += `
// 		#greendiv .previoustry::before {
// 			content: "${above.green}";
// 		}`
// 	}
// 	if (below.green < green.value && green.value < color.green) {
// 		console.log(below.green, green.value, color.green)
// 		below.green = green.value
// 		style.innerHTML += `
// 		#greendiv .previoustry::after {
// 			content: "${below.green}";
// 		}`
// 	}
// 	if (above.blue > blue.value && blue.value > color.blue) {
// 		console.log(above.blue, blue.value, color.blue)
// 		above.blue = blue.value
// 		style.innerHTML += `
// 		#bluediv .previoustry::before {
// 			content: "${above.blue}";
// 		}`
// 	}
// 	if (below.blue < blue.value && blue.value < color.blue) {
// 		console.log(below.blue, blue.value, color.blue)
// 		below.blue = blue.value
// 		style.innerHTML += `
// 		#bluediv .previoustry::after {
// 			content: "${below.blue}";
// 		}`
// 	}
// 	document.head.appendChild(style);

// }
function checkinput(input, todays) {

	input.parentElement.classList = "inputdiv"
	let prev = input.previousElementSibling;
	console.log(prev)

	if (todays > input.value) {
		input.parentElement.classList.add("below")
		if (parseInt(input.value) > prev.dataset.below) {
			prev.setAttribute("data-below", input.value)
		}
	}

	else if (todays < input.value) {
		input.parentElement.classList.add("above")
		if (parseInt(input.value) < prev.dataset.above || prev.dataset.above == "") {
			prev.setAttribute("data-above", input.value)
		}
	}

	else {
		input.parentElement.classList.add("correct")
	}

	// input.parentelement
	// span
	// if (prev < input < color)
	//   style
}
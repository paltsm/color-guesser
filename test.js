import { setcookies, getcookies } from "./cookies.js";
import { todayscolor } from "./todays-color.js";

// variables

const TODAYSCOLOR = await todayscolor()
let tries = 6
let done = false

// cookies

let today = new Date().toJSON().slice(0, 10)
let wins = getcookies("wins")
let loses = getcookies("loses")
let lastplayed = getcookies("lastplayed")

// from html

const RED = document.getElementById("red")
const GREEN = document.getElementById("green")
const BLUE = document.getElementById("blue")
const GUESS = document.getElementById("guess")
const STATS = document.getElementById("stats")
const TRIES = document.getElementById("tries-left")
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

GUESS.addEventListener("click", () => {

	// check if input is lower/higher/correct

	checkinput(RED, color.red)
	checkinput(GREEN, color.green)
	checkinput(BLUE, color.blue)

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

	tries--
	TRIES.innerText = tries

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

function checkinput(input, todays) {

	input.parentElement.classList = ""
	let prev = input.input.previousElementSibling

	if (todays > input.value) {
		input.parentElement.classList.add("below")
		if (parseInt(input.value) > prev.dataset.below || prev.dataset.below == "") {
			prev.setAttribute("data-below", input.value)
		}
	}

	else if (today < input.value) {
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
// script:
// - todayscolor
// - tries
// - today
// - done
// cookies
//   - wins
//   - loses
//   - lastplayed
// page
// - red
//   - parentElement
//   - span
// - green
//   - parentElement
//   - span
// - blue
//   - parentElement
//   - span
// - button
// - stats
//   - wins
//   - loses

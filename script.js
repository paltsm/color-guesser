import { setcookies, getcookies } from "./cookies.js";
import { todayscolor } from "./todays-color.js";

let color = await todayscolor()
let tries = 6

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
		} else if (c.value > 255) {
			c.value = 255
		}
	})
}

// is input lower/higher/correct

function checkinput(input, todays) {
	input.parentElement.classList = ""
	if (todays > input.value) {
		input.parentElement.classList.add("lower")
	}
	else if (todays < input.value) {
		input.parentElement.classList.add("higher")
	}
	else {
		input.parentElement.classList.add("correct")
	}
}

// disable inputs

function disableinputs() {
	RED.disabled = true
	GREEN.disabled = true
	BLUE.disabled = true
}
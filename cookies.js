
// this creates/updates the cookie with the name (wins/loses/lastplayed)

export function setcookies(name, value) {
	let date = new Date()
	date.setTime(date.getTime() + (399 * 24 * 3600 * 1000))
	date.toUTCString()
	document.cookie = `${name}=${value};SameSite=Strict;expires=${date}`
	console.log(document.cookie)
}

// this reads the cookie with the name

export function getcookies(name) {
	const value = document.cookie.split("; ").find((row) => row.startsWith(`${name}=`))?.split("=")[1];
	return typeof (value) !== "undefined" ? value : 0;
}
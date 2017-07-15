let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const timerButtons = document.querySelectorAll('.timer__button');

// Function that handles our counter
function timer(seconds) {

	// Reset any ongoing timers
	clearInterval(countdown);

	const now = Date.now();
	const then = now + seconds * 1000;
	displayTimeLeft(seconds);
	displayEndTime(then);
	countdown = setInterval(() => {
		const secondsLeft = Math.round((then - Date.now()) / 1000);
		// check if we should stop it
		if(secondsLeft < 0) {
			clearInterval(countdown);
			return;
		}
		displayTimeLeft(secondsLeft);
	}, 1000)
}


// Function to display the remaining time
function displayTimeLeft(seconds) {
	const minutes = Math.floor(seconds / 60);
	const remainderSeconds = seconds % 60;
	const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
	timerDisplay.textContent = display;
	document.title = display;
}

// Function to display time of return
function displayEndTime(timestamp) {
	const end = new Date(timestamp);
	const hours = end.getHours();
	const minutes = end.getMinutes();
	endTime.textContent = `Be Back At - ${hours > 12 ? hours - 12 : hours}:${minutes < 10 ? '0' : ''}${minutes}`;
}


// Listening for various events
timerButtons.forEach(timerButton => timerButton.addEventListener('click', () => {
	timer(timerButton.dataset['time']);
}));

document.customForm.addEventListener('submit', function(e) {
	e.preventDefault();
	if(this.minutes.value > 0){
		timer(this.minutes.value * 60);
	} else {
		alert('Invalid Input');
	}
	this.reset();
});
let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const timerButtons = document.querySelectorAll('.timer__button');
const timeForm = document.querySelector('#custom');


// Function that handles our counter
function timer(seconds) {
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
	endTime.textContent = `Be Back At - ${hours}:${minutes}`;
}


// Listening for various events
timerButtons.forEach(timerButton => timerButton.addEventListener('click', () => {
	clearInterval(countdown);
	timer(timerButton.dataset['time']);
}));

timeForm.addEventListener('submit', (e) => {
	clearInterval(countdown);
	e.preventDefault();
	const textField = timeForm.querySelector('input');
	if (textField.value > 0){
		timer(textField.value * 60);
	} else {
		alert('Invalid Input');
	}
});
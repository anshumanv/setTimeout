let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const timerButtons = document.querySelectorAll('.timer__button');
var audio = new Audio("AMemoryAway.ogg") ;

//audio.oncanplaythrough = function(){
//audio.play();
//}
//
//
//audio.onended = function(){
//audio.play();
//}
// Function that handles our counter
    function notifyMe() {
  // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }
  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification("Time's Up!");
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification("Time's Up!");
      }
    });
  }
}

function timer(seconds) {

	// Reset any ongoing timers
	clearInterval(countdown);
    audio.pause();
    audio.currentTime = 0;
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
	const hour = Math.floor(seconds / 3600);
	const minutes = Math.floor( (seconds % 3600) / 60);
	const remainderSeconds = seconds % 60;
	const display = `${hour < 10 ? '0' : ''}${hour}:${minutes < 10 ? '0' : ''}${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
	timerDisplay.textContent = display;
	document.title = display;
	if (hour == 0 && minutes == 0 && remainderSeconds == 0)
		{
            document.title = "Time's Up !";
            notifyMe();
            audio.play();
        }
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
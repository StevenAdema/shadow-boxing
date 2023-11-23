const menuOptions = {
    option1: ['normal', 'fast', 'slow'],
    option2: ['hybrid', 'jab', 'hook', 'cross', 'slips & ducks', 'footwork'],
    option3: ['5', '6', '7', '8', '9', '10', '3', '4'],
    option4: ['15s', '20s', '25s', '30s'],
};

function cycleOption(optionId) {
    const currentOptionIndex = menuOptions[optionId].indexOf(document.getElementById(optionId).innerText);
    const nextOptionIndex = (currentOptionIndex + 1) % menuOptions[optionId].length;
    document.getElementById(optionId).innerText = menuOptions[optionId][nextOptionIndex];
}

document.getElementById('startButton').addEventListener('click', function() {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('workoutScreen').style.display = 'block';
    var audio = document.getElementById("audio");
    audio.play();
    go();
});

document.getElementById('backToMenu').addEventListener('click', function() {
    document.getElementById('workoutScreen').style.display = 'none';
    document.getElementById('menu').style.display = 'block';
});

/***************   TIMER FUNCTIONALITY     *****************************/
function go() {
    let x = 181; // Duration of first timer phase in seconds
    let y = 31; // Duration of second timer phase in seconds
    let z = 8; // Number of cycles
    let currentTimer = x;
    let intervalId;
    let cycleCount = 1;
    var combos = [[1,2,3],[1,1,2],[3,2,3,4],[1,1,2]]
    var audio = new Audio('fx/punch.mp3')

    startTimer();
    runTrainer(combos);

    function playAudio(url) {
        // new Audio(url).play();
        console.log("play audio");
      }

    function applyTransform(elementId, scale, rotation, translate_x, translate_y) {
        $(`#${elementId}`).css({ 
            transition: 'transform 0.2s ease-in-out',
            transform: `scale(${scale}) rotate(${rotation}deg) translate(${translate_x}%, ${translate_y}%)`
        });
        setTimeout(function() {
            $(`#${elementId}`).css({
                transform: 'scale(1) rotate(0deg) translate(-50%, -50%)'
            });
        }, 200);
        playAudio('fx/punch1.mp3');
    }

    function runTrainer(combos){ 
        let delay = 0;
        for (let i = 0; i < combos.length; i++) {
            const combo = combos[i];
            for (let j = 0; j < combo.length; j++) {
                const punch = combo[j];
                setTimeout(function(){
                    if (punch == 1) {applyTransform('pad-left', 1.4, 10, -40, -40);}
                    if (punch == 2) {applyTransform('pad-right', 1.4, -10, -35, -50);}
                    if (punch == 3) {applyTransform('pad-left', 1.2, -90, 50, -30);}
                    if (punch == 4) {applyTransform('pad-right', 1.4, -10);}
                }, delay);
                delay += 400;
            }
            delay += 2000; // Add a pause of 2 seconds after each combo
        }
    }

    function updateTimerDisplay() {
    const minutes = Math.floor(currentTimer / 60);
    const seconds = currentTimer % 60;
    document.getElementById('safeTimerDisplay').innerHTML = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    function updateCycleDisplay() {
    // Calculate the current cycle number and update the text content of the div
    const currentCycle = Math.ceil(cycleCount / 2);
    console.log(currentCycle);
    document.getElementById('round').innerHTML = `Round<br>${currentCycle} / 8`;
    }

    function startTimer() {
    intervalId = setInterval(() => {
        if (currentTimer > 0) {
        currentTimer--;
        updateTimerDisplay();
        } else {
        cycleCount++;
        updateCycleDisplay(); // Update the cycle display each time a cycle ends

        if (cycleCount % 2 != 0) {
            currentTimer = x;
            document.getElementById('timer').style.color = 'red';
        } else {
            currentTimer = y;
            document.getElementById('timer').style.color = 'green';
        }

        if (cycleCount === z * 2) {
            clearInterval(intervalId);
            alert("Timer cycle complete!");
        }
        }
    }, 1000);
    }

    function toggleTimer() {
    if (!intervalId) {
        startTimer();
    } else {
        clearInterval(intervalId);
        intervalId = null;
    }
    }

    document.getElementById('play_pause').addEventListener('click', toggleTimer);
};



$(document).ready(function () {
    $('#play_pause').click(function () {
        $(this).toggleClass('fa-play fa-pause');
    });
});

var audio = document.getElementById("audio");
audio.volume = 0.5;

go();
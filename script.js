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
    var combos = [[ 1,1,2,3],[1,1,2,3],[1,1,2,3],[2,2,1,1,2,3]]
    var audio = new Audio('fx/punch.mp3')

    startTimer();
    runTrainer(combos);

    function playAudio(url) {
        new Audio(url).play();
      }

    function runTrainer(combos){
        let delay = 0;
        for (let i = 0; i < combos.length; i++) {
            const combo = combos[i];
            for (let j = 0; j < combo.length; j++) {
                const punch = combo[j];
                setTimeout(function(){
                    if (punch == 1) {
                        console.log("jab")
                        $('#pad-left').css({ 
                            transition: 'transform 0.2s ease-in-out',
                            transform: 'scale(1.4) rotate(10deg) translate(-40%, -40%)'
                        });
                        playAudio('fx/punch1.mp3');
                        setTimeout(function() {
                            $('#pad-left').css({
                                transform: 'scale(1) rotate(0deg) translate(-50%, -50%)'
                            });
                        }, 200);
                    }
                    if (punch == 2) {
                        console.log("cross")
                        $('#pad-right').css({ 
                            transition: 'transform 0.2s ease-in-out',
                            transform: 'scale(1.4) rotate(-10deg) translate(-35%, -50%)'
                        });
                        playAudio('fx/punch1.mp3');
                        setTimeout(function() {
                            $('#pad-right').css({
                                transform: 'scale(1) rotate(0deg) translate(-50%, -50%)'
                            });
                        }, 200);
                    }
                    if (punch == 3) {
                        console.log("hook");
                        $('#pad-left').css({ 
                            transition: 'transform 0.2s ease-in-out',
                            transform: 'scale(1.2) rotate(-90deg) translate(45%, -30%)'
                        });
                        playAudio('fx/punch1.mp3')
                        setTimeout(function() {
                            $('#pad-left ').css({
                                transform: 'scale(1) rotate(0deg) translate(-50%, -50%)'
                            });
                        }, 200);
                    }
                }, delay);

                delay += 300; // 1000 ms for animation + 1000 ms pause
            }
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
audio.volume = 0.2;

var combos = [[1,1,2,3],[1,3],[1,1],[2,3,2]]
function runTrainer(combos, ){
    for (let i = 0; i < combos.length; i++) {
        const combo = combos[i];
        for (let j = 0; j < combo.length; j++) {
            const punch = combo[j];
            if (punch == 1) {
                document.getElementById('jab').style.backgroundColor = "red";
                setTimeout(function(){ document.getElementById('pad-right').style.backgroundColor = "white"; }, 500);
            }
            if (punch == 2) {
                document.getElementById('cross').style.backgroundColor = "red";
                setTimeout(function(){ document.getElementById('pad-right').style.backgroundColor = "white"; }, 500);
            }
            if (punch == 3) {
                document.getElementById('hook').style.backgroundColor = "red";
                setTimeout(function(){ document.getElementById('pad-right').style.backgroundColor = "white"; }, 500);
            }
        }
    }
}
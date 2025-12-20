/* ===============================
   COMMON ELEMENTS
================================ */
const hoursEl   = document.querySelector('.hours');
const minutesEl = document.querySelector('.minutes');
const secondsEl = document.querySelector('.seconds');
const ampmEl    = document.querySelector('.tm');
const container = document.querySelector('.inner-container');

/* ===============================
   CLOCK (runs only if .tm exists)
================================ */
function updateSunColor(now) {
    if (!container) return;

    const hour = now.getHours() + now.getMinutes() / 60;

    if (hour >= 5 && hour < 8) {
        container.style.background = 'linear-gradient(to top, #FFEDD5, #FDBA74, #F97316)';
    } else if (hour >= 8 && hour < 12) {
        container.style.background = 'linear-gradient(to top, #f9cd94ff, #ed9255ff)';
    } else if (hour >= 12 && hour < 16) {
        container.style.background = 'linear-gradient(to top, #FEF9C3, #FDE047)';
    } else if (hour >= 16 && hour < 17.5) {
        container.style.background = 'linear-gradient(to top, #FED7AA, #FB923C)';
    } else if (hour >= 17.5 && hour <= 18.5) {
        container.style.background = 'linear-gradient(to top, #f5ecd3ff, #FED7AA , #FB923C)';
    } else if (hour > 18.5 && hour < 21) {
        container.style.background = 'linear-gradient(to top,white, #d7d9ddff, white)';
    } else {
        container.style.background = 'linear-gradient(to top,whitesmoke, #cbccd1ff, white)';
    }
}

function updateSkyColor(now) {
    const hour = now.getHours() + now.getMinutes() / 60;

    if (hour > 5.5 && hour <= 6.5) {
        document.body.style.background =
            'linear-gradient(to top, #FFEDD5, #FDBA74, #F97316)';
    } else if (hour > 6.5 && hour <= 9) {
        document.body.style.background =
            'linear-gradient(to top, #DBEAFE, #93C5FD, #60A5FA)';
    } else if (hour > 9 && hour <= 12) {
        document.body.style.background =
            'linear-gradient(to top, #E0F2FE, #BAE6FD)';
    } else if (hour > 12 && hour <= 17.5) {
        document.body.style.background =
            'linear-gradient(to top,  #DBEAFE, #93C5FD, #60A5FA)';
    } else if (hour > 17.5 && hour <= 18) {
        document.body.style.background =
            'linear-gradient(to top, #e1e2e5ff 10%, white, #FDBA74, #FB923C)';
    }
    else if(hour>18 && hour<=18.5){
        document.body.style.background = 'linear-gradient(to bottom, grey, lightgray, white)'
    }
     else {
        document.body.style.background =
            'linear-gradient(to top, #020617, #020617)';
    }
}

function updateClock() {
    if (!ampmEl) return; // 👈 runs ONLY on clock page

    const now = new Date();
    let hour = now.getHours();

    ampmEl.textContent = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;

    hoursEl.textContent   = hour.toString().padStart(2, '0');
    minutesEl.textContent = now.getMinutes().toString().padStart(2, '0');
    secondsEl.textContent = now.getSeconds().toString().padStart(2, '0');

    updateSunColor(now);
    updateSkyColor(now);
}

/* ===============================
   STOPWATCH (runs only if buttons exist)
================================ */
const startBtn = document.querySelector('.start');
const stopBtn  = document.querySelector('.stop');
const resetBtn = document.querySelector('.reset');

let totalSeconds = 0;
let timer = null;

function updateStopwatchDisplay() {
    if (!startBtn) return;

    hoursEl.textContent =
        Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    minutesEl.textContent =
        Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    secondsEl.textContent =
        (totalSeconds % 60).toString().padStart(2, '0');
}

function startClock() {
    if (!startBtn || timer !== null) return;

    timer = setInterval(() => {
        totalSeconds++;
        updateStopwatchDisplay();
    }, 1000);

    stopBtn.style.display = 'inline-block';
}

function stopClock() {
    if (!stopBtn) return;

    clearInterval(timer);
    timer = null;
    stopBtn.style.display = 'none';
}

function resetClock() {
    if (!resetBtn) return;

    stopClock();
    totalSeconds = 0;
    updateStopwatchDisplay();
}

/* ===============================
   INITIALIZATION
================================ */

// Clock page
if (ampmEl) {
    updateClock();
    setInterval(updateClock, 1000);
}

// Stopwatch page
if (startBtn) {
    stopBtn.style.display = 'none';
    updateStopwatchDisplay();
}


const sky = document.querySelector('.sky');

function createBubble() {
    const bubble = document.createElement('div');
    bubble.classList.add('cloud'); // reuse cloud style as bubble

    // random horizontal position (entire screen)
    bubble.style.left = Math.random() * 90 + 'vw';

    // start from bottom
    bubble.style.bottom = '-20vmin';

    // random size
    const size = Math.random() * 10 + 10; // 10–20vmin
    bubble.style.width = size + 'vmin';
    bubble.style.height = size + 'vmin';

    // random speed (slower looks better)
    bubble.style.animationDuration =
        Math.random() * 1 + 6 + 's'; // 6–10s

    sky.appendChild(bubble);

    setTimeout(() => bubble.remove(), 12000);
}
const now = new Date();
updateSkyColor(now)
setInterval(createBubble, 1000);

const lapList = document.querySelector('.laps-list');
let lapCount = 0;

function lapClock() {
    if (!lapList || timer === null) return;

    lapCount++;

    const li = document.createElement('li');
    li.textContent =
        `Lap ${lapCount} — ` +
        `${hoursEl.textContent}:` +
        `${minutesEl.textContent}:` +
        `${secondsEl.textContent}`;

    lapList.prepend(li); // newest on top
}

function resetClock() {
    if (!resetBtn) return;

    stopClock();
    totalSeconds = 0;
    lapCount = 0;

    if (lapList) lapList.innerHTML = '';

    updateStopwatchDisplay();
}
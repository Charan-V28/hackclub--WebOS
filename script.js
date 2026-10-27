const enterBtn = document.getElementById('enter-btn');
const welcomeScreen = document.getElementById('welcome-screen');
const liveClock = document.getElementById('live-clock');

// Transition to desktop (Part 1)
enterBtn.addEventListener('click', () => {
    welcomeScreen.classList.add('hidden');
});

// Live clock function (Part 2)
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    liveClock.textContent = `${hours}:${minutes}:${seconds}`;
}
updateClock();
setInterval(updateClock, 1000);

// Window Management & Dragging (Part 3)
const appWindow = document.getElementById('app-window');
const windowTitle = document.getElementById('window-title');
const windowContent = document.getElementById('window-content');
const closeBtn = document.querySelector('.close-btn');
const desktopIcons = document.querySelectorAll('.desktop-icon');

// Open window when desktop icon is clicked (Part 4 & 5 Apps)
desktopIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        const appType = icon.getAttribute('data-app');
        
        if (appType === 'notes') {
            windowTitle.textContent = 'Notes - Personal Profile';
            windowContent.innerHTML = `
                <div class="app-container">
                    <div class="app-sidebar">
                        <button class="app-tab-btn active" data-tab="about">About Me</button>
                        <button class="app-tab-btn" data-tab="skills">My Skills</button>
                        <button class="app-tab-btn" data-tab="goals">Stardance Goals</button>
                    </div>
                    <div class="app-main-content" id="tab-display">
                        <h3>About Me</h3>
                        <p>Hey! I'm a builder learning to code, crafting cool web projects, and building my own WebOS from scratch.</p>
                    </div>
                </div>
            `;

            // Tab switching logic inside the Notes app (Part 4)
            const tabButtons = windowContent.querySelectorAll('.app-tab-btn');
            const tabDisplay = document.getElementById('tab-display');

            tabButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    tabButtons.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');

                    const tabName = btn.getAttribute('data-tab');
                    if (tabName === 'about') {
                        tabDisplay.innerHTML = `
                            <h3>About Me</h3>
                            <p>Hey! I'm a builder learning to code, crafting cool web projects, and building my own WebOS from scratch.</p>
                        `;
                    } else if (tabName === 'skills') {
                        tabDisplay.innerHTML = `
                            <h3>My Skills</h3>
                            <p>🛠️ HTML5, CSS3, JavaScript<br>⚡ Git & GitHub<br>💻 VS Code & Web Development</p>
                        `;
                    } else if (tabName === 'goals') {
                        tabDisplay.innerHTML = `
                            <h3>Stardance Goals</h3>
                            <p>🚀 Accumulate hours building amazing software.<br>🌟 Ship a complete WebOS project and share it with the community!</p>
                        `;
                    }
                });
            });

        } else if (appType === 'projects') {
            windowTitle.textContent = 'Projects - My Work';
            windowContent.innerHTML = `
                <h3>My WebOS Project</h3>
                <p>A simulated web-based operating system featuring a desktop workspace, draggable windows, live clock, and custom built-in apps!</p>
            `;
        } else if (appType === 'calculator') {
            windowTitle.textContent = 'Calculator App';
            windowContent.innerHTML = `
                <div style="display: flex; flex-direction: column; gap: 10px; max-width: 250px; margin: 0 auto;">
                    <input type="text" id="calc-display" readonly style="width: 100%; padding: 10px; font-size: 18px; text-align: right; background: #0f172a; color: #f8fafc; border: 1px solid rgba(255,255,255,0.2); border-radius: 6px;" value="0">
                    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px;">
                        <button class="calc-btn" onclick="appendCalc('7')">7</button>
                        <button class="calc-btn" onclick="appendCalc('8')">8</button>
                        <button class="calc-btn" onclick="appendCalc('9')">9</button>
                        <button class="calc-btn" onclick="appendCalc('/')" style="background:#38bdf8; color:#0f172a;">/</button>
                        
                        <button class="calc-btn" onclick="appendCalc('4')">4</button>
                        <button class="calc-btn" onclick="appendCalc('5')">5</button>
                        <button class="calc-btn" onclick="appendCalc('6')">6</button>
                        <button class="calc-btn" onclick="appendCalc('*')" style="background:#38bdf8; color:#0f172a;">*</button>
                        
                        <button class="calc-btn" onclick="appendCalc('1')">1</button>
                        <button class="calc-btn" onclick="appendCalc('2')">2</button>
                        <button class="calc-btn" onclick="appendCalc('3')">3</button>
                        <button class="calc-btn" onclick="appendCalc('-')" style="background:#38bdf8; color:#0f172a;">-</button>
                        
                        <button class="calc-btn" onclick="appendCalc('0')">0</button>
                        <button class="calc-btn" onclick="clearCalc()" style="background:#ef4444; color:white;">C</button>
                        <button class="calc-btn" onclick="calculateResult()" style="background:#22c55e; color:white;">=</button>
                        <button class="calc-btn" onclick="appendCalc('+')" style="background:#38bdf8; color:#0f172a;">+</button>
                    </div>
                </div>
            `;
        }

        appWindow.classList.remove('hidden');
    });
});

// Close window button
closeBtn.addEventListener('click', () => {
    appWindow.classList.add('hidden');
});

// Draggable window logic (Part 3)
const windowHeader = document.querySelector('.window-header');
let isDragging = false;
let offsetX, offsetY;

windowHeader.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - appWindow.offsetLeft;
    offsetY = e.clientY - appWindow.offsetTop;
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    appWindow.style.left = `${e.clientX - offsetX}px`;
    appWindow.style.top = `${e.clientY - offsetY}px`;
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

// Calculator helper functions (Part 5)
function appendCalc(val) {
    const display = document.getElementById('calc-display');
    if (display.value === '0' && val !== '.') {
        display.value = val;
    } else {
        display.value += val;
    }
}

function clearCalc() {
    document.getElementById('calc-display').value = '0';
}

function calculateResult() {
    const display = document.getElementById('calc-display');
    try {
        display.value = eval(display.value);
    } catch (error) {
        display.value = 'Error';
    }
}
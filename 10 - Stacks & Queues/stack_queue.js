// === Stack Implementation ===
const stackCanvas = document.getElementById('stackCanvas');
const stackCtx = stackCanvas.getContext('2d');
let stack = [];
const stackWidth = 80;
const stackHeight = 30;

// 🎯 **Draw Stack**
function drawStack() {
    stackCtx.clearRect(0, 0, stackCanvas.width, stackCanvas.height);

    stack.forEach((value, index) => {
        stackCtx.beginPath();
        stackCtx.rect(150, stackCanvas.height - (index + 1) * (stackHeight + 5), stackWidth, stackHeight);
        stackCtx.stroke();
        stackCtx.fillText(value, 175, stackCanvas.height - (index + 1) * (stackHeight + 5) + 20);
    });
}

// 🎯 **Push Operation**
function pushStack() {
    const value = document.getElementById('stackValue').value;
    if (value !== "") {
        stack.push(value);
        drawStack();
        document.getElementById('stackValue').value = "";
    }
}

// 🎯 **Pop Operation**
function popStack() {
    stack.pop();
    drawStack();
}

// 🎯 **Enter Key Listener for Stack**
document.getElementById('stackValue').addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        pushStack();
    }
});


// === Queue Implementation ===
const queueCanvas = document.getElementById('queueCanvas');
const queueCtx = queueCanvas.getContext('2d');
let queue = [];
const queueWidth = 50;
const queueHeight = 30;
const queueSpacing = 60;

// 🎯 **Draw Queue**
function drawQueue() {
    queueCtx.clearRect(0, 0, queueCanvas.width, queueCanvas.height);

    queue.forEach((value, index) => {
        queueCtx.beginPath();
        queueCtx.rect(index * queueSpacing + 10, 50, queueWidth, queueHeight);
        queueCtx.stroke();
        queueCtx.fillText(value, index * queueSpacing + 25, 70);

        if (index < queue.length - 1) {
            queueCtx.beginPath();
            queueCtx.moveTo(index * queueSpacing + 60, 65);
            queueCtx.lineTo(index * queueSpacing + 70, 65);
            queueCtx.stroke();
        }
    });
}

// 🎯 **Enqueue Operation**
function enqueue() {
    const value = document.getElementById('queueValue').value;
    if (value !== "") {
        queue.push(value);
        drawQueue();
        document.getElementById('queueValue').value = "";
    }
}

// 🎯 **Dequeue Operation**
function dequeue() {
    queue.shift();
    drawQueue();
}

// 🎯 **Enter Key Listener for Queue**
document.getElementById('queueValue').addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        enqueue();
    }
});
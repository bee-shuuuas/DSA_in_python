const canvas = document.getElementById('graphCanvas');
const ctx = canvas.getContext('2d');

let graph = {};
let positions = {};
const nodeRadius = 20;

// 🎯 **Draw the Graph**
function drawGraph() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw edges
    ctx.strokeStyle = "black";
    for (let startNode in graph) {
        graph[startNode].forEach((endNode) => {
            ctx.beginPath();
            ctx.moveTo(positions[startNode].x, positions[startNode].y);
            ctx.lineTo(positions[endNode].x, positions[endNode].y);
            ctx.stroke();
        });
    }

    // Draw nodes
    for (let node in positions) {
        ctx.beginPath();
        ctx.arc(positions[node].x, positions[node].y, nodeRadius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fillText(node, positions[node].x - 5, positions[node].y + 5);
    }
}

// 🎯 **Add Node**
function addNode() {
    const value = document.getElementById('nodeValue').value;
    if (value !== "" && !graph[value]) {
        graph[value] = [];
        positions[value] = {
            x: Math.random() * (canvas.width - 40) + 20,
            y: Math.random() * (canvas.height - 40) + 20
        };
        drawGraph();
        document.getElementById('output').innerText = `Node "${value}" added.`;
        document.getElementById('nodeValue').value = "";
    }
}

// 🎯 **Remove Node**
function removeNode() {
    const value = document.getElementById('nodeValue').value;
    if (graph[value]) {
        delete graph[value];
        delete positions[value];
        for (let node in graph) {
            graph[node] = graph[node].filter((v) => v !== value);
        }
        drawGraph();
        document.getElementById('output').innerText = `Node "${value}" removed.`;
        document.getElementById('nodeValue').value = "";
    }
}

// 🎯 **Add Edge**
function addEdge() {
    const start = document.getElementById('edgeStart').value;
    const end = document.getElementById('edgeEnd').value;
    if (graph[start] && graph[end] && !graph[start].includes(end)) {
        graph[start].push(end);
        drawGraph();
        document.getElementById('output').innerText = `Edge "${start} → ${end}" added.`;
        document.getElementById('edgeStart').value = "";
        document.getElementById('edgeEnd').value = "";
    }
}

// 🎯 **Remove Edge**
function removeEdge() {
    const start = document.getElementById('edgeStart').value;
    const end = document.getElementById('edgeEnd').value;
    if (graph[start]) {
        graph[start] = graph[start].filter((v) => v !== end);
        drawGraph();
        document.getElementById('output').innerText = `Edge "${start} → ${end}" removed.`;
        document.getElementById('edgeStart').value = "";
        document.getElementById('edgeEnd').value = "";
    }
}

// 🎯 **Enter Key Listeners**
document.getElementById('nodeValue').addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addNode();
    }
});
document.getElementById('edgeStart').addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addEdge();
    }
});
document.getElementById('edgeEnd').addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addEdge();
    }
});

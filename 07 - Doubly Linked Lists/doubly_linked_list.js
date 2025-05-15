const canvas = document.getElementById('doublyLinkedListCanvas');
const ctx = canvas.getContext('2d');

let doublyLinkedList = [];
const nodeWidth = 50;
const nodeHeight = 30;
const spacing = 100;

// 🎯 **Draw the Doubly Linked List**
function drawDoublyLinkedList() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    doublyLinkedList.forEach((value, index) => {
        // Draw Node
        ctx.beginPath();
        ctx.rect(index * spacing + 20, 80, nodeWidth, nodeHeight);
        ctx.stroke();
        ctx.fillText(value, index * spacing + 35, 100);

        // Draw Next Arrow
        if (index < doublyLinkedList.length - 1) {
            ctx.beginPath();
            ctx.moveTo(index * spacing + 70, 95);
            ctx.lineTo(index * spacing + 90, 95);
            ctx.lineTo(index * spacing + 85, 90);
            ctx.moveTo(index * spacing + 90, 95);
            ctx.lineTo(index * spacing + 85, 100);
            ctx.stroke();
        }

        // Draw Previous Arrow
        if (index > 0) {
            ctx.beginPath();
            ctx.moveTo(index * spacing + 20, 95);
            ctx.lineTo(index * spacing, 95);
            ctx.lineTo(index * spacing + 5, 90);
            ctx.moveTo(index * spacing, 95);
            ctx.lineTo(index * spacing + 5, 100);
            ctx.stroke();
        }
    });
}

// 🎯 **Add Node**
function addNode() {
    const value = document.getElementById('nodeValue').value;
    if (value !== "") {
        doublyLinkedList.push(value);
        drawDoublyLinkedList();
        document.getElementById('nodeValue').value = "";
    }
}

// 🎯 **Remove Node**
function removeNode() {
    doublyLinkedList.pop();
    drawDoublyLinkedList();
}

// 🎯 **Add Event Listener for Enter Key**
document.getElementById('nodeValue').addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addNode();
    }
});

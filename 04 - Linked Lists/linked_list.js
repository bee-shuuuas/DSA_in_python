const canvas = document.getElementById('linkedListCanvas');
const ctx = canvas.getContext('2d');

let linkedList = [];
const nodeWidth = 50;
const nodeHeight = 30;
const spacing = 70;

// Function to draw the Linked List
function drawLinkedList() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    linkedList.forEach((value, index) => {
        // Draw Node
        ctx.beginPath();
        ctx.rect(index * spacing + 10, 80, nodeWidth, nodeHeight);
        ctx.stroke();
        
        // Draw Value
        ctx.fillText(value, index * spacing + 25, 100);

        // Draw Arrow (if not last node)
        if (index < linkedList.length - 1) {
            ctx.beginPath();
            ctx.moveTo(index * spacing + 60, 95);
            ctx.lineTo(index * spacing + 70, 95);
            ctx.lineTo(index * spacing + 65, 90);
            ctx.moveTo(index * spacing + 70, 95);
            ctx.lineTo(index * spacing + 65, 100);
            ctx.stroke();
        }
    });
}

// Function to Add Node
function addNode() {
    const value = document.getElementById('nodeValue').value;
    if (value !== "") {
        linkedList.push(value);
        drawLinkedList();
        document.getElementById('nodeValue').value = "";
    }
}

// Function to Remove Node
function removeNode() {
    linkedList.pop();
    drawLinkedList();
}

const canvas = document.getElementById('heapCanvas');
const ctx = canvas.getContext('2d');

let heap = [];
const nodeRadius = 20;
const xSpacing = 40;
const ySpacing = 60;

// 🎯 **Insert into Heap**
function insertHeap() {
    const value = parseInt(document.getElementById('heapValue').value);
    const heapType = document.getElementById('heapType').value;

    if (!isNaN(value)) {
        heap.push(value);
        if (heapType === "min") {
            minHeapifyUp(heap.length - 1);
        } else {
            maxHeapifyUp(heap.length - 1);
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawHeap();
        document.getElementById('output').innerText = `Inserted ${value} into ${heapType}`;
        document.getElementById('heapValue').value = "";
    }
}

// 🎯 **Min-Heapify Up**
function minHeapifyUp(index) {
    if (index <= 0) return;

    const parentIndex = Math.floor((index - 1) / 2);
    if (heap[index] < heap[parentIndex]) {
        [heap[index], heap[parentIndex]] = [heap[parentIndex], heap[index]];
        minHeapifyUp(parentIndex);
    }
}

// 🎯 **Max-Heapify Up**
function maxHeapifyUp(index) {
    if (index <= 0) return;

    const parentIndex = Math.floor((index - 1) / 2);
    if (heap[index] > heap[parentIndex]) {
        [heap[index], heap[parentIndex]] = [heap[parentIndex], heap[index]];
        maxHeapifyUp(parentIndex);
    }
}

// 🎯 **Remove Root from Heap**
function removeHeap() {
    if (heap.length === 0) return;

    const heapType = document.getElementById('heapType').value;
    const root = heap[0];
    heap[0] = heap.pop();

    if (heapType === "min") {
        minHeapifyDown(0);
    } else {
        maxHeapifyDown(0);
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawHeap();
    document.getElementById('output').innerText = `Removed root node: ${root}`;
}

// 🎯 **Min-Heapify Down**
function minHeapifyDown(index) {
    const left = 2 * index + 1;
    const right = 2 * index + 2;
    let smallest = index;

    if (left < heap.length && heap[left] < heap[smallest]) {
        smallest = left;
    }
    if (right < heap.length && heap[right] < heap[smallest]) {
        smallest = right;
    }
    if (smallest !== index) {
        [heap[index], heap[smallest]] = [heap[smallest], heap[index]];
        minHeapifyDown(smallest);
    }
}

// 🎯 **Max-Heapify Down**
function maxHeapifyDown(index) {
    const left = 2 * index + 1;
    const right = 2 * index + 2;
    let largest = index;

    if (left < heap.length && heap[left] > heap[largest]) {
        largest = left;
    }
    if (right < heap.length && heap[right] > heap[largest]) {
        largest = right;
    }
    if (largest !== index) {
        [heap[index], heap[largest]] = [heap[largest], heap[index]];
        maxHeapifyDown(largest);
    }
}

// 🎯 **Draw the Heap**
function drawHeap() {
    if (heap.length === 0) return;
    
    const startX = canvas.width / 2;
    const startY = 40;

    function drawNode(index, x, y, offset) {
        if (index >= heap.length) return;

        // Draw left child
        if (2 * index + 1 < heap.length) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x - offset, y + ySpacing);
            ctx.stroke();
            drawNode(2 * index + 1, x - offset, y + ySpacing, offset / 2);
        }

        // Draw right child
        if (2 * index + 2 < heap.length) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + offset, y + ySpacing);
            ctx.stroke();
            drawNode(2 * index + 2, x + offset, y + ySpacing, offset / 2);
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(x, y, nodeRadius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fillText(heap[index], x - 5, y + 5);
    }

    drawNode(0, startX, startY, canvas.width / 4);
}

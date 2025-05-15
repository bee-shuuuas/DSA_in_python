const canvas = document.getElementById('hashTableCanvas');
const ctx = canvas.getContext('2d');

const tableSize = 10; // Hash table size
const cellHeight = 50;
const cellWidth = 200;
const spacing = 5;
let hashTable = new Array(tableSize).fill(null).map(() => []);

ctx.font = "16px Arial";

// 🎯 **Draw the Hash Table**
function drawHashTable() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "black";

    for (let i = 0; i < tableSize; i++) {
        ctx.beginPath();
        ctx.rect(50, i * (cellHeight + spacing), cellWidth, cellHeight);
        ctx.stroke();
        ctx.fillText(`Index ${i}`, 5, i * (cellHeight + spacing) + 30);

        // Draw linked list items
        hashTable[i].forEach((item, index) => {
            ctx.beginPath();
            ctx.rect(260 + (index * (cellWidth / 2)), i * (cellHeight + spacing), cellWidth / 2, cellHeight);
            ctx.stroke();
            ctx.fillText(`${item.key}: ${item.value}`, 265 + (index * (cellWidth / 2)), i * (cellHeight + spacing) + 30);
        });
    }
}

// 🎯 **Hash Function**
function hashFunction(key) {
    let hash = 0;
    for (let char of key) {
        hash += char.charCodeAt(0);
    }
    return hash % tableSize;
}

// 🎯 **Insert into Hash Table**
function insertHash() {
    const key = document.getElementById('hashKey').value;
    const value = document.getElementById('hashValue').value;
    if (key !== "" && value !== "") {
        const index = hashFunction(key);

        // Prevent duplicate keys
        if (!hashTable[index].some(item => item.key === key)) {
            hashTable[index].push({ key, value });
            drawHashTable();
            document.getElementById('output').innerText = `Inserted "${key}: ${value}" at index ${index}`;
        } else {
            document.getElementById('output').innerText = `Key "${key}" already exists!`;
        }
        document.getElementById('hashKey').value = "";
        document.getElementById('hashValue').value = "";
    }
}

// 🎯 **Delete from Hash Table**
function deleteHash() {
    const key = document.getElementById('hashKey').value;
    if (key !== "") {
        const index = hashFunction(key);
        hashTable[index] = hashTable[index].filter(item => item.key !== key);
        drawHashTable();
        document.getElementById('output').innerText = `Deleted key "${key}" from index ${index}`;
        document.getElementById('hashKey').value = "";
    }
}

// 🎯 **Draw Initial Table**
drawHashTable();

// 🎯 **Enter Key Listeners**
document.getElementById('hashKey').addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        insertHash();
    }
});

document.getElementById('hashValue').addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        insertHash();
    }
});

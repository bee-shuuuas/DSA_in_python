const canvas = document.getElementById('binarySearchCanvas');
const ctx = canvas.getContext('2d');

let sortedArray = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const nodeWidth = 50;
const nodeHeight = 30;
const spacing = 60;

// 🎯 **Draw the Array**
function drawArray(highlightIndex = -1) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    sortedArray.forEach((value, index) => {
        ctx.beginPath();
        ctx.rect(index * spacing + 50, 200, nodeWidth, nodeHeight);
        if (index === highlightIndex) {
            ctx.fillStyle = "yellow";
            ctx.fill();
        }
        ctx.stroke();
        ctx.fillStyle = "black";
        ctx.fillText(value, index * spacing + 65, 220);
    });
}

// 🎯 **Start the Search**
function startBinarySearch() {
    const value = parseInt(document.getElementById('searchValue').value);
    if (!isNaN(value)) {
        drawArray();
        document.getElementById('output').innerText = `Searching for ${value}...`;
        setTimeout(() => {
            const index = recursiveBinarySearch(0, sortedArray.length - 1, value);
            if (index !== -1) {
                document.getElementById('output').innerText = `Found ${value} at index ${index}`;
            } else {
                document.getElementById('output').innerText = `${value} not found in the array.`;
            }
        }, 500);
    }
}

// 🎯 **Recursive Binary Search Function**
function recursiveBinarySearch(low, high, target) {
    if (low > high) return -1;

    const mid = Math.floor((low + high) / 2);

    drawArray(mid);

    if (sortedArray[mid] === target) {
        return mid;
    } else if (sortedArray[mid] > target) {
        return recursiveBinarySearch(low, mid - 1, target);
    } else {
        return recursiveBinarySearch(mid + 1, high, target);
    }
}

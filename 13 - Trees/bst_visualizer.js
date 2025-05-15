const canvas = document.getElementById('bstCanvas');
const ctx = canvas.getContext('2d');

// 🎯 **Tree Node Definition**
class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

let root = null;
const nodeRadius = 20;
const xSpacing = 40;
const ySpacing = 60;

// 🎯 **Insert Node into BST**
function insertNode() {
    const value = parseInt(document.getElementById('bstValue').value);
    if (!isNaN(value)) {
        root = insert(root, value);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawTree(root, canvas.width / 2, 40, canvas.width / 4);
        document.getElementById('bstValue').value = "";
    }
}

function insert(root, value) {
    if (root === null) {
        return new TreeNode(value);
    }
    if (value < root.value) {
        root.left = insert(root.left, value);
    } else if (value > root.value) {
        root.right = insert(root.right, value);
    }
    return root;
}

// 🎯 **Delete Node from BST**
function deleteNode() {
    const value = parseInt(document.getElementById('bstValue').value);
    if (!isNaN(value)) {
        root = deleteFromTree(root, value);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawTree(root, canvas.width / 2, 40, canvas.width / 4);
        document.getElementById('bstValue').value = "";
    }
}

function deleteFromTree(root, value) {
    if (root === null) return null;

    if (value < root.value) {
        root.left = deleteFromTree(root.left, value);
    } else if (value > root.value) {
        root.right = deleteFromTree(root.right, value);
    } else {
        // Node found — handle three cases
        if (!root.left) return root.right;
        if (!root.right) return root.left;

        // Find the minimum in the right subtree
        let minNode = findMin(root.right);
        root.value = minNode.value;
        root.right = deleteFromTree(root.right, minNode.value);
    }
    return root;
}

function findMin(node) {
    while (node.left !== null) {
        node = node.left;
    }
    return node;
}

// 🎯 **Draw the BST**
function drawTree(node, x, y, offset) {
    if (!node) return;

    // Draw the left and right branches
    if (node.left) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - offset, y + ySpacing);
        ctx.stroke();
        drawTree(node.left, x - offset, y + ySpacing, offset / 2);
    }
    if (node.right) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + offset, y + ySpacing);
        ctx.stroke();
        drawTree(node.right, x + offset, y + ySpacing, offset / 2);
    }

    // Draw the node
    ctx.beginPath();
    ctx.arc(x, y, nodeRadius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillText(node.value, x - 5, y + 5);
}

// 🎯 **Enter Key Listener for Insertion**
document.getElementById('bstValue').addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        insertNode();
    }
});

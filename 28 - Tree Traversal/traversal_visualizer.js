const canvas = document.getElementById('traversalCanvas');
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
let traversalPath = [];

// 🎯 **Insert Node into BST**
function insertNode() {
    const value = parseInt(document.getElementById('traversalValue').value);
    if (!isNaN(value)) {
        root = insert(root, value);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawTree(root, canvas.width / 2, 40, canvas.width / 4);
        document.getElementById('traversalValue').value = "";
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

// 🎯 **Draw the Tree**
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

// 🎯 **Traversal Logic**
function traverse(type) {
    traversalPath = [];
    if (type === "inorder") {
        inorderTraversal(root);
    } else if (type === "preorder") {
        preorderTraversal(root);
    } else if (type === "postorder") {
        postorderTraversal(root);
    }
    
    // Animate the path
    animateTraversal(traversalPath);

    // Display the path
    document.getElementById("output").innerText = `${type.toUpperCase()}: ` + traversalPath.join(' → ');
}

// 🎯 **Traversal Functions**
function inorderTraversal(node) {
    if (node) {
        inorderTraversal(node.left);
        traversalPath.push(node.value);
        inorderTraversal(node.right);
    }
}

function preorderTraversal(node) {
    if (node) {
        traversalPath.push(node.value);
        preorderTraversal(node.left);
        preorderTraversal(node.right);
    }
}

function postorderTraversal(node) {
    if (node) {
        postorderTraversal(node.left);
        postorderTraversal(node.right);
        traversalPath.push(node.value);
    }
}

// 🎯 **Traversal Animation**
function animateTraversal(path) {
    let i = 0;
    const interval = setInterval(() => {
        if (i < path.length) {
            highlightNode(root, path[i], canvas.width / 2, 40, canvas.width / 4);
            i++;
        } else {
            clearInterval(interval);
        }
    }, 600);
}

function highlightNode(node, value, x, y, offset) {
    if (!node) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawTree(root, canvas.width / 2, 40, canvas.width / 4);

    if (node.value === value) {
        ctx.beginPath();
        ctx.arc(x, y, nodeRadius, 0, 2 * Math.PI);
        ctx.fillStyle = "yellow";
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "black";
    } else {
        if (value < node.value) {
            highlightNode(node.left, value, x - offset, y + ySpacing, offset / 2);
        } else {
            highlightNode(node.right, value, x + offset, y + ySpacing, offset / 2);
        }
    }
}

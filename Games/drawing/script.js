const rows = 64;
const columns = 128;
const sizeOfGrid = rows * columns; // Define the size of the grid
const grid = document.querySelector(".grid"); // Get the reference to the parent grid element in the DOM
let stackCount = 0;

document.querySelector(".grid").style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
document.querySelector(".grid").style.gridTemplateRows = `repeat(${rows}, 1fr)`;

for (let i = 0; i < sizeOfGrid; i++) { // Loop to create grid cells dynamically
    let gridChild = document.createElement("span"); // Create a span element for each grid cell
    gridChild.classList.add("gridChild"); // Add a class 'gridChild' to each span element

    grid.appendChild(gridChild); // Append the grid cell (span) to the grid container
}

let mouseEnterList = [];
let mouseLeaveList = [];
let spacePressed;

document.querySelectorAll("span").forEach((stack) => {
        stack.addEventListener("mouseenter", function() {
            mouseEnterList.push(this)
            if (mouseEnterList.length > 8) {
                mouseEnterList.splice(0, 1);
            }
            let colorList = ["black", "pink", "purple", "blue", "green", "yellow", "orange", "red"];
            let count = 0;
            mouseEnterList.forEach((element) => {
                element.style.backgroundColor = colorList[count];
                count++;
            })
        })
        stack.addEventListener("mouseleave", function() {
        mouseLeaveList.push(this)
    })
})
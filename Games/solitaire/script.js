const sizeOfGrid = 9 * 3
const grid = document.querySelector(".grid"); // Get the reference to the parent grid element in the DOM
let stackCount = 0;

for (let i = 0; i < sizeOfGrid; i++) { // Loop to create grid cells dynamically
    let gridChild = document.createElement("span"); // Create a span element for each grid cell
    gridChild.classList.add("gridChild"); // Add a class 'gridChild' to each span element (for styling purposes)

    if (i == (sizeOfGrid / 3)) { // Special case for a specific grid cell (position calculated as one-third of the grid)
        let cardDiv = document.createElement("div"); // Create a div to hold the card image
        cardDiv.id = "cardDiv"; // Assign an ID to the card div

        let img = document.createElement("img"); // Create an img element to represent the card's back image
        img.src = "../../resources/cards_png/green_back.png"; // Set the image source (card back)

        cardDiv.appendChild(img); // Append the image to the card div
        gridChild.appendChild(cardDiv); // Append the card div to the grid cell
    }

    if (i >= (((sizeOfGrid / 3) - 1) + 2) && i <= ((sizeOfGrid / 3) - 1) * 2) { // Apply 'stack' class to a range of grid cells based on the position
        gridChild.classList.add("stack"); // Add the 'stack' class (for special styling or behavior)
        
        stackCount++;
        gridChild.classList.add(stackCount);
    }

    grid.appendChild(gridChild); // Append the grid cell (span) to the grid container
}

dragElement(document.getElementById("cardDiv")); // Make the card div draggable by calling the dragElement function

function dragElement(elmnt) { // Function to enable dragging behavior for an element
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0; // Variables for tracking position changes
    const stackElements = Array.from(document.querySelectorAll(".stack")); // Get all elements with 'stack' class

    elmnt.onmousedown = dragMouseDown; // Set up the mouse down event to start dragging

    function dragMouseDown(e) { // Function to initiate the dragging on mouse down
        e = e || window.event; // Handle old and new event models
        e.preventDefault(); // Prevent default behavior (e.g., text selection)
        pos3 = e.clientX; // Capture the starting horizontal mouse position
        pos4 = e.clientY; // Capture the starting vertical mouse position
        document.onmouseup = closeDragElement; // When the mouse is released, stop dragging
        document.onmousemove = elementDrag; // When the mouse moves, update element's position
    }

    function elementDrag(e) { // Function to update the position of the element as the mouse moves
        e = e || window.event; // Handle old and new event models
        e.preventDefault(); // Prevent default behavior
        pos1 = pos3 - e.clientX; // Calculate horizontal movement
        pos2 = pos4 - e.clientY; // Calculate vertical movement
        pos3 = e.clientX; // Update horizontal position
        pos4 = e.clientY; // Update vertical position
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px"; // Adjust the element's top position
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px"; // Adjust the element's left position
    }

    function closeDragElement() { // Function to stop dragging and finalize the position of the element
        document.onmouseup = null; // Remove mouseup listener
        document.onmousemove = null; // Remove mousemove listener

        let closestStack = null; // Find the closest stack element to snap the card to
        let closestDistance = Infinity; // Variable to store the closest distance

        stackElements.forEach(stack => { // Loop through all stack elements to calculate the closest one
            const stackRect = stack.getBoundingClientRect(); // Get the stack element's position
            const cardRect = elmnt.getBoundingClientRect(); // Get the card element's position
            const distance = Math.hypot( // Calculate the distance between the card and the stack
                stackRect.left - cardRect.left,
                stackRect.top - cardRect.top
            );

            if (distance < closestDistance) { // If this stack is closer than the previous closest, update the closest stack
                closestDistance = distance;
                closestStack = stack;
                stack.appendChild(document.querySelector("#cardDiv"));
            }
        });

        if (closestStack && closestDistance < Infinity) { // If a closest stack element is found within a reasonable distance, snap to its position
            const closestRect = closestStack.getBoundingClientRect(); // Get the closest stack's position
            // elmnt.style.top = (closestRect.top + window.scrollY) + "px"; // Align vertically with the stack
            // elmnt.style.left = (closestRect.left + window.scrollX) + "px"; // Align horizontally with the stack
        }
    }
}
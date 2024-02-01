// assign here the container selector where all of the draggable items exist
let containerSelector = ".wrapper";
// assign here a common class that is exit in all draggable items
let itemSelector = ".draggable";
/** 
 * Add your custom styles here for the item which is currently dragging
 * This styles will be apply when drag an item
*/
let styles = 'opacity:40%;'

// Drag and Drop Functionality
let container = document.querySelector(containerSelector);
let allDraggableItems = document.querySelectorAll(itemSelector);

allDraggableItems.forEach((draggableItem) => {
  draggableItem.setAttribute("draggable", "true");

  // Drag Start
  draggableItem.addEventListener("dragstart", () => {
    draggableItem.classList.add("dragging");
    draggableItem.setAttribute("style", styles);
  });

  // Drag End
  draggableItem.addEventListener("dragend", () => {
    draggableItem.classList.remove("dragging");
    draggableItem.removeAttribute("style");
  });
});

function placingItem(event) {
  event.preventDefault();

  // Current dragging element
  let currentDragging = document.querySelector(".dragging");

  // Getting all element expect the current dragging element
  let OtherElements = [
    ...document.querySelectorAll(`${itemSelector}:not(.dragging)`),
  ];

  // Finding the place where the dragging item should be placed
  let nextElement = OtherElements.find((element) => {
    return event.clientY <= element.offsetTop + element.offsetHeight / 2;
  });

  // Insert the current dragging element before the found other element
  container.insertBefore(currentDragging, nextElement);
}

// Drag over listener
container.addEventListener("dragover", placingItem);

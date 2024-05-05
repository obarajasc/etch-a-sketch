function deleteSketch() {
    const container = document.querySelector(".container");
    const divs = container.querySelectorAll("div");

    divs.forEach(div => {
        div.remove();
    });
}

function createSketch(size) {
    deleteSketch();

    let container = document.querySelector(".container");

    size = getGridSize(size);

    for (let j = 0; j < size; j++) {
        for (let i = 0; i < size; i++) {
            const div = document.createElement("div");
            container.appendChild(div);

            drawDiv(div, "hovered");
        }
    }

    container.style.setProperty('--columns', size);

    resetClickWhenLeavingSketch();
}

function getGridSize(size) {
    if (size > 100) {
        return 100;
    }
    return size;
}

const drawDiv = function (element, className) {

    element.addEventListener("mousedown", function (event) {
        isMouseDown = true;
        element.classList.add(className);
        event.preventDefault();
    });

    element.addEventListener("mouseup", function () {
        isMouseDown = false;
    });

    element.addEventListener("mouseenter", function () {
        if (isMouseDown) {
            element.classList.add(className);
        }
    });

};

function resetClickWhenLeavingSketch() {
    let container = document.querySelector(".container");

    container.addEventListener("mouseleave", function () {
        isMouseDown = false;
    });

}

function readInput() {
    const sketchSizeInputElement = document.querySelector("#input-sketch-size");
    const elementValue = sketchSizeInputElement.value;
    return validateInput(elementValue);
}

function validateInput(input) {
    const number = parseInt(input);
    if (!isNaN(number) && Number.isInteger(number)) {
        return number;
    } else {
        return 30;
    }
}

function buttonClick() {
    let sketchSize = 30;
    const resetButtonElement = document.querySelector("#reset-button");
    resetButtonElement.addEventListener("click", function () {
        sketchSize = readInput();
        createSketch(sketchSize);
    });

}

function isNumeric(event) {
    let key = event.keyCode || event.which;
    return (key >= 48 && key <= 57) || key == 8 || key == 46 || key == 9;
}

let isMouseDown = false;

buttonClick();
createSketch(30);
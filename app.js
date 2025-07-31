let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let drawMsg = document.querySelector(".draw-msg"); // Select Draw Message

let turn0 = true; // Player 0 starts

const winPatterns = [
    [0,1,2], [0,3,6], [0,4,8],
    [1,4,7], [2,5,8], [2,4,6],
    [3,4,5], [6,7,8]
];

const resetGame = () => {
    turn0 = true; 
    enableBoxes();
    msgContainer.classList.add("hide");
    drawMsg.classList.add("hide"); // Hide draw message
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn0) {
            box.innerText = "0";
            box.style.color = "red";
            turn0 = false;
        } else {
            box.innerText = "X";
            box.style.color = "blue";
            turn0 = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.style.color = ""; // Reset color
    }
};

const showMessage = (message) => {
    msg.innerText = message;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
            showMessage(`Congratulations, Winner is ${pos1Val}`);
            return; // Stop checking further
        }
    }

    // Check for Draw: If all boxes are filled and no winner
    let isDraw = [...boxes].every((box) => box.innerText !== "");
    if (isDraw) {
        drawMsg.classList.remove("hide"); // Show draw message
        disableBoxes(); // Stop further moves
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

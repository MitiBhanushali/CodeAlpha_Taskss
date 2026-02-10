const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");
const historyDiv = document.getElementById("history");
const historyPanel = document.getElementById("historyPanel");
const menuBtn = document.getElementById("menuBtn");
const closeHistoryBtn = document.getElementById("closeHistory");
const clearHistoryBtn = document.querySelector(".clear-history");

let expression = "";

/* Menu controls */
menuBtn.onclick = () => {
    historyPanel.classList.add("active");
};

closeHistoryBtn.onclick = () => {
    historyPanel.classList.remove("active");
};

/* Button clicks */
buttons.forEach(btn => {
    btn.addEventListener("click", () => handleInput(btn.textContent));
});

/* Keyboard support */
document.addEventListener("keydown", e => {
    if ("0123456789.+-*/".includes(e.key)) handleInput(e.key);
    if (e.key === "Enter") handleInput("=");
    if (e.key === "Backspace") backspace();
    if (e.key === "Escape") clearAll();
});

/* Core logic */
function handleInput(val) {
    if (val === "AC") clearAll();
    else if (val === "⌫") backspace();
    else if (val === "=") calculate();
    else if (val === "%") percentage();
    else {
        expression += convertOperator(val);
        display.value = expression;
    }
}

function calculate() {
    if (!expression) return;

    try {
        const result = eval(expression);

        if (!isFinite(result)) throw new Error("Invalid");

        addHistory(expression + " = " + result);
        expression = result.toString();
        display.value = expression;
    } catch {
        display.value = "Error";
        expression = "";
    }
}

function percentage() {
    try {
        const match = expression.match(/(\d+\.?\d*)$/);
        if (!match) return;

        const number = match[0];
        const percent = (parseFloat(number) / 100).toString();

        expression = expression.replace(/(\d+\.?\d*)$/, percent);
        display.value = expression;
    } catch {}
}

function clearAll() {
    expression = "";
    display.value = "";
}

function backspace() {
    expression = expression.slice(0, -1);
    display.value = expression;
}

function convertOperator(op) {
    if (op === "÷") return "/";
    if (op === "×") return "*";
    if (op === "−") return "-";
    return op;
}

function addHistory(text) {
    const p = document.createElement("p");
    p.textContent = text;
    historyDiv.prepend(p);
}

/* Clear history */
clearHistoryBtn.onclick = () => {
    if (!historyDiv.innerHTML.trim()) return;
    historyDiv.innerHTML = "";
};

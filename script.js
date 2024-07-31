const inputButtons = document.querySelectorAll('.input-btn-js');
const questionInput = document.querySelector('.question-js');
const clearButton = document.querySelector('.clear-btn-js');
const deleteButton = document.querySelector('.remove-btn');
const solveButton = document.querySelector('.equal');
const answerDisplay = document.querySelector('.answer-js');
const bracketButton = document.querySelector('.brackets');

inputButtons.forEach((button) => {
    button.addEventListener('click', () => {
        questionInput.value += button.value;
    })
});

clearButton.addEventListener('click', () => {
    questionInput.value = '';
    answerDisplay.value = '';
})

deleteButton.addEventListener('click', () => {
    questionInput.value = questionInput.value.slice(0, -1);
    answerDisplay.value = '';
});

solveButton.addEventListener('click', () => {
    if (isValidMathExpression(questionInput.value)) {
        answerDisplay.value = eval(questionInput.value);
    } else {
    alert('Provide a correct question');
    }
});

let bracket = '(';

 bracketButton.addEventListener('click', () => {

    if (bracket === '(') {
        questionInput.value += bracket;
        bracket = ')';
    } else if (bracket === ')') {
        questionInput.value += bracket;
        bracket = '('
    }

    console.log(bracket);
 });

 function isValidMathExpression(expression) {
    // Check for unmatched parentheses
    let stack = [];
    for (let char of expression) {
        if (char === '(') {
            stack.push(char);
        } else if (char === ')') {
            if (stack.length === 0) {
                return false;
            }
            stack.pop();
        }
    }
    if (stack.length !== 0) {
        return false;
    }

    // Check for invalid characters
    if (/[^0-9+\-*/().\s]/.test(expression)) {
        return false;
    }

    if (expression === '') {
        return false;
    }

    // Check for invalid operator usage
    if (/[\+\-*/]{2,}/.test(expression) || /[\+\-*/]$/.test(expression) || /^[\+\-*/]/.test(expression)) {
        return false;
    }

    // Check for misplaced decimal points
    if (/\.\D|\D\./.test(expression) || /\.\d+\./.test(expression)) {
        return false;
    }

    return true;
}


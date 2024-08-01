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
    });

    button.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && event.target.tagName === 'INPUT') {
            event.preventDefault();        
        }
    });
});

document.addEventListener('keydown', (event) => {
     inputButtons.forEach((button) => {
        if (event.key === button.value) {
            button.click();
            isClicked(button);
        }
 });
});

clearButton.addEventListener('click', () => {
        clear();
        isClicked(clearButton);
})
document.addEventListener('keydown', (event) => {
    if (event.key === 'c' || event.key === 'C') {
        clear();
        isClicked(clearButton);
    }
})

deleteButton.addEventListener('click', () => {
       deleTe();
});

document.addEventListener('keydown', (event) => {
     if (event.key === 'Backspace') {
        deleTe();
        isClicked(deleteButton);
     }
});

solveButton.addEventListener('click', () => {
        solveQuestion();
});

window.addEventListener('keydown', (event) => {
     if (event.key === 'Enter' || event.key === '=') {
        solveQuestion();
     };
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

 document.addEventListener('keydown', (event) => {
    if (event.key === '(') {
        questionInput.value += event.key;
        isClicked(bracketButton);
    } else if (event.key === ')') {
        questionInput.value += event.key;
        isClicked(bracketButton);
    }
 })

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

function solveQuestion() {

    let isTrue = true;
    if (answerDisplay.value) {
        isTrue = false;
        console.log(isTrue);
    };


    if (isValidMathExpression(questionInput.value)) {
        answerDisplay.value = eval(questionInput.value);
    } else {
    alert('Provide a correct question');
    };

    if (isValidMathExpression(questionInput.value)) {
        if (isTrue) {
    solveButton.style.transform = 'translateY(.1cm)';
        setTimeout(() => {
            solveButton.style.transform = 'translateY(0)'
        },200);
    };
    };
};

function deleTe() {
    questionInput.value = questionInput.value.slice(0, -1);
    answerDisplay.value = '';
};

function clear() {
    questionInput.value = '';
    answerDisplay.value = '';
}

function isClicked(button) {
    button.style.transform = 'translateY(.1cm)';
    setTimeout(() => {
        button.style.transform = 'translateY(0)'
    },200);
};


let left, op, right

const returnFunc = str => {
    // helper function that returns a function that takes in
    // two int and returns an expression
    [left, op, right] = expression.split('')
    switch (op) {
        case'+':
            func = (left, right) => left + right 
        break
        case'-':
            func = (left, right) => left - right 
        break
        case'*':
            func = (left, right) => left * right 
        break
        case'/':
            func = (left, right) => left / right 
        break
        case'^':
            func = (left, right) => left ** right 
        break
        case '%':
            func = (left, right) => left % right 
        break
    }
    return func
}


const evaluate = str => {
    // evaluate calls returnFunc() to get the function
    // and prints out the result of the expression
    [left, op, right] = expression.split('')
    left = parseInt(left)
    right = parseInt(right)

    const func = returnFunc(str)
    resultExpression = func(left, right)

    console.log(resultExpression)
}

const expression = '5%3';
let operator = evaluate(expression)
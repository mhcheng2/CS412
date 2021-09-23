
// execute input function on the input string
const process = (str, decorator) => decorator(str)

// first expression
const breakStrOnC = str => {
    let arr = []
    let tempStr = ''
    
    for (let i = 0; i < str.length; i++) {
        if (str[i] !== 'c') {
            tempStr += str[i]
        }
        else if (str[i] === 'c') {
            arr.push(tempStr)
            tempStr = 'c'
        }
    }
    arr.push(tempStr)
    return arr
}


// Second expression
const countA = str => (str.match(/a/g) || []).length
const replaceA = str => str.replace(/a/g, 'A')

const resultA = str => {
    return {
        originalString: str,
        modifiedString: replaceA(str),
        numberReplaced: countA(str),
        length: str.length
    }
}


const first = process("supercalifragilisticexpialidocious", breakStrOnC)
const second = process("supercalifragilisticexpialidocious", resultA)

console.log("First expression is:")
console.log(first)
console.log("Second expression is:")
console.table(second)
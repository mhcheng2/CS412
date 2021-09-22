

const reverseAlphabet = str => {
    // first split the string to array, then sort the array with the UTF-16 values of char,
    // then join them back into a string
    let newStr = str.toLowerCase().split('').sort().join('')

    return newStr
}

console.log(`The new string is ${reverseAlphabet("supercalifragilisticexpialidocious")}`)
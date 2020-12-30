/*

- Link: https://www.codewars.com/kata/55c45be3b2079eccff00010f/train/javascript

Your task is to sort a given string. Each word in the string will contain a single number. This number is the position the word should have in the result.

Note: Numbers can be from 1 to 9. So 1 will be the first word (not 0).

If the input string is empty, return an empty string. The words in the input String will only contain valid consecutive numbers.

Examples:

"is2 Thi1s T4est 3a"  -->  "Thi1s is2 3a T4est"
"4of Fo1r pe6ople g3ood th5e the2"  -->  "Fo1r the2 g3ood 4of th5e pe6ople"
""  -->  ""

*/

// Regular Expression: ([a-zA-Z]+(?=[1-9]{1})[0-9]?[a-zA-Z]+)|(^[1-9]{1}(?=[a-zA-Z])[a-zA-Z]+)|([a-zA-Z]+(?=[1-9]{1})[1-9]{1}$)

/**
 * Sort a given string
 * @param {String} words 
 */
function order(words) {
    // If the input string is empty, return an empty string
    if (words.length === 0) return words;
    // Split a string into an array of substrings
    const array = words.split(' ');
    // Rearrange the elements in ascending order then convert the elements of an array into a string
    return array.sort((a, b) => getNumberFromString(a) - getNumberFromString(b)).join(' '); 
}

/**
 * Get Number From String
 * @param {String} str Character string containing numbers
 * @returns {Number} the number is in the text string
 */
function getNumberFromString(str) {
    return parseInt(str.replace(/[a-zA-Z]/g, ''));
}


// -------------------------------Testing---------------------------------
Test.assertEquals(order("is2 Thi1s T4est 3a"), "Thi1s is2 3a T4est")
Test.assertEquals(order("4of Fo1r pe6ople g3ood th5e the2"), "Fo1r the2 g3ood 4of th5e pe6ople")
Test.assertEquals(order(""), "")
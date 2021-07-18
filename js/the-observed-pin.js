/*

Alright, detective, one of our colleagues successfully observed our target person, Robby the robber. We followed him to a secret warehouse, where we assume to find all the stolen stuff. The door to this warehouse is secured by an electronic combination lock. Unfortunately our spy isn't sure about the PIN he saw, when Robby entered it.

The keypad has the following layout:

┌───┬───┬───┐
│ 1 │ 2 │ 3 │
├───┼───┼───┤
│ 4 │ 5 │ 6 │
├───┼───┼───┤
│ 7 │ 8 │ 9 │
└───┼───┼───┘
    │ 0 │
    └───┘
He noted the PIN 1357, but he also said, it is possible that each of the digits he saw could actually be another adjacent digit (horizontally or vertically, but not diagonally). E.g. instead of the 1 it could also be the 2 or 4. And instead of the 5 it could also be the 2, 4, 6 or 8.

He also mentioned, he knows this kind of locks. You can enter an unlimited amount of wrong PINs, they never finally lock the system or sound the alarm. That's why we can try out all possible (*) variations.

* possible in sense of: the observed PIN itself and all variations considering the adjacent digits

Can you help us to find all those variations? It would be nice to have a function, that returns an array (or a list in Java and C#) of all variations for an observed PIN with a length of 1 to 8 digits. We could name the function getPINs (get_pins in python, GetPINs in C#). But please note that all PINs, the observed one and also the results, must be strings, because of potentially leading '0's. We already prepared some test cases for you.

Detective, we are counting on you!

For C# user: Do not use Mono. Mono is too slower when run your code.

*/

// Solution:

/**
 * @param {string} observed 
 */
function getPINs(observed) {
    const lines = [];
    const cartesian = (lines) => lines.reduce((a, b) => (
        a.map((x) =>
            b.map((y) =>
                x.concat(y)
            )
        ).reduce((a, b) => (
            a.concat(b)
        ), [])
    ), [[]]);

    for (let index = 0; index < observed.length; index++) {
        const keypad = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9'], [null, '0', null]];
        const indexOfLine = keypad.findIndex(i => i.includes(observed[index]));
        const indexOfNumber = keypad[indexOfLine].indexOf(observed[index]);
        lines[index] = lines[index] || [];
        if (keypad[indexOfLine][indexOfNumber] === 0) lines[index].push(keypad[indexOfLine][indexOfNumber]);
        else {
            if (indexOfNumber === 0) keypad[indexOfLine].pop();
            if (indexOfNumber === (keypad[indexOfLine].length - 1)) keypad[indexOfLine].shift();
            lines[index].push(...keypad[indexOfLine].filter(i => i));
        }
        if (indexOfLine === 0) lines[index].push(keypad[indexOfLine + 1][indexOfNumber]);
        else if (indexOfLine > 0 && indexOfLine < (keypad.length - 1)) {
            if (keypad[indexOfLine - 1][indexOfNumber]) lines[index].push(keypad[indexOfLine - 1][indexOfNumber]);
            if (keypad[indexOfLine + 1][indexOfNumber]) lines[index].push(keypad[indexOfLine + 1][indexOfNumber]);
        } else lines[index].push(keypad[indexOfLine - 1][indexOfNumber]);
    }
    return cartesian(lines).map(arr => arr.join(''));
}

// Sample Tests:

describe('example tests', function () {
    var expectations = {
        "8": ["5", "7", "8", "9", "0"],
        "11": ["11", "22", "44", "12", "21", "14", "41", "24", "42"],
        "369": ["339", "366", "399", "658", "636", "258", "268", "669", "668", "266", "369", "398", "256", "296", "259", "368", "638", "396", "238", "356", "659", "639", "666", "359", "336", "299", "338", "696", "269", "358", "656", "698", "699", "298", "236", "239"]
    };

    for (var pin in expectations) {
        Test.assertSimilar(getPINs(pin).sort(), expectations[pin].sort(), 'PIN: ' + pin);
    }
});

// Other solutions: 

function getPINs(observed) {
    var keypad = [
        '1', '2', '3',
        '4', '5', '6',
        '7', '8', '9',
        null, '0', null
    ];
    var availables = observed.split('').map(function (observed) {
        var pos = keypad.indexOf(observed);
        var top = keypad[pos - 3];
        var left = (pos % 3 && keypad[pos - 1]);
        var right = (((pos + 1) % 3) && keypad[pos + 1]);
        var bottom = keypad[pos + 3];
        return [left, top, observed, right, bottom].filter(Boolean);
    });
    return (function discovery(solution) {
        var concat = [].concat;
        var which = availables.shift();
        try {
            return concat.apply([], which.map(function (item) {
                solution.push(item);
                try {
                    return availables.length && concat.apply([], discovery(solution)) || solution.join('');
                } finally {
                    solution.pop();
                }
            }));
        } finally {
            availables.unshift(which);
        }
    })([]);

}
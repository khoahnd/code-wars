/*

Create a function taking a positive integer as its parameter and returning a string containing the Roman Numeral representation of that integer.

Modern Roman numerals are written by expressing each digit separately starting with the left most digit and skipping any digit with a value of zero. In Roman numerals 1990 is rendered: 1000=M, 900=CM, 90=XC; resulting in MCMXC. 2008 is written as 2000=MM, 8=VIII; or MMVIII. 1666 uses each Roman symbol in descending order: MDCLXVI.

Example:

solution(1000); // should return 'M'
Help:

Symbol    Value
I          1
V          5
X          10
L          50
C          100
D          500
M          1,000
Remember that there can't be more than 3 identical symbols in a row.

More about roman numerals - http://en.wikipedia.org/wiki/Roman_numerals

 */

function solution(number){
    var symbol = {1000:"M",900:"CM",500:"D",400:"CD",100:"C",90:"XC",50:"L",40:"XL",10:"X",9:"IX",5:"V",4:"IV",1:"I"};
    var result = "";
    Object.keys(symbol).reverse().forEach(function(key){
                while(number>=key){
                  result = result.concat(symbol[key]);
                  number -=key ;}});
    return result ;
}

// ------------------------------- Testing -------------------------------------------

const chai = require('chai');
const assert = chai.assert;

describe("solution", function(){
  it ("should handle small numbers", function(){
    assert.strictEqual(solution(1), 'I', '1 should, "I"')
    assert.strictEqual(solution(2), 'II', '2 should, "II"')
    assert.strictEqual(solution(3), 'III', '3 should, "III"')
    assert.strictEqual(solution(4), 'IV', '4 should, "IV"')
    assert.strictEqual(solution(5), 'V', '5 should, "V"')
    assert.strictEqual(solution(9), 'IX', '9 should, "IX"')
    assert.strictEqual(solution(10), 'X', '10 should, "X"')
    assert.strictEqual(solution(11), 'XI')
    assert.strictEqual(solution(19), 'XIX')
    assert.strictEqual(solution(22), 'XXII')
    assert.strictEqual(solution(15), 'XV')
  });
  
  it ("should handle large numbers", function(){
    assert.strictEqual(solution(1000), 'M', '1000 should, "M"')
    assert.strictEqual(solution(1001), 'MI', '1001 should, "MI"')
    assert.strictEqual(solution(1990), 'MCMXC', '1990 should, "MCMXC"')
    assert.strictEqual(solution(2007), 'MMVII', '2007 should, "MMVII"')
    assert.strictEqual(solution(2008), 'MMVIII', '2008 should, "MMVIII"')
  });
  
  it ("random tests", function(){
    let Roman = {
        map: [
            1000, 'M', 900, 'CM', 500, 'D', 400, 'CD', 100, 'C', 90, 'XC',
            50, 'L', 40, 'XL', 10, 'X', 9, 'IX', 5, 'V', 4, 'IV', 1, 'I',
        ],
        toRoman: function(n) {
            let value = '';
            for (let idx = 0; n > 0 && idx < this.map.length; idx += 2) {
                while (n >= this.map[idx]) {
                    value += this.map[idx + 1];
                    n -= this.map[idx];
                }
            }
            return value;
        }
    };
    
    for(let i=0; i<100; i++) {
      let n=1+Math.random()*3888|0;
      const exp =  Roman.toRoman(n)
      assert.strictEqual(solution(n),exp);
    }
  });
});

// ---------------------------------------------Other Solution----------------------------------------------

function solution(number){
    var hundreds = ['','C','CC','CCC','CD','D','DC','DCC','DCCC','CM'];
    var tens = ['','X','XX','XXX','XL','L','LX','LXX','LXXX','XC'];
    var ones = ['','I','II','III','IV','V','VI','VII','VIII','IX'];
    
    var str = '';
    
    while(number >= 1000){
      str += 'M';
      number -= 1000;
    }
    
    str += hundreds[Math.floor(number/100)];
    number = number % 100;
    
    str += tens[Math.floor(number/10)];
    number = number % 10;
    
    str += ones[number];
    
    return str;
  }
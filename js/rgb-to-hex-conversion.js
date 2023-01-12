/**
 * 
 * The rgb function is incomplete. Complete it so that passing in RGB decimal values will result in a hexadecimal representation being returned. Valid decimal values for RGB are 0 - 255. Any values that fall out of that range must be rounded to the closest valid value.

    Note: Your answer should always be 6 characters long, the shorthand with 3 will not work here.

    The following are examples of expected output values:

    rgb(255, 255, 255) // returns FFFFFF
    rgb(255, 255, 300) // returns FFFFFF
    rgb(0,0,0) // returns 000000
    rgb(148, 0, 211) // returns 9400D3
 * 
 */

function rgb(r, g, b) {
  return toHex(r) + toHex(g) + toHex(b);
}

function toHex(d) {
  if (d < 0) {
    return "00";
  }
  if (d > 255) {
    return "FF";
  }
  return ("0" + Number(d).toString(16)).slice(-2).toUpperCase();
}

// ------------------------------- Testing -------------------------------------------

describe("Tests", () => {
    it("Basic Tests", () => {
      Test.assertEquals(rgb(0, 0, 0), '000000')
      Test.assertEquals(rgb(0, 0, -20), '000000')
      Test.assertEquals(rgb(300,255,255), 'FFFFFF')
      Test.assertEquals(rgb(173,255,47), 'ADFF2F')
    });
  
  
  function rgbReference(r, g, b){
    function hex(n){
      n = parseInt(n, 10)
      if (isNaN(n)) return "00"
      n = Math.max(0, Math.min(n, 255))
      var chars = "0123456789ABCDEF"
      return chars.charAt((n - n % 16) / 16) + chars.charAt(n % 16)
    }  
    
    return hex(r) + hex(g) + hex(b)
  }
  
  function elevatorReference(left, right, call){
     return (Math.abs(right-call)<=Math.abs(left-call))? 'right' : 'left';
  }
  
  
  function generator() {
    var a = randInt(-5,300)
    var b = randInt(-5,300)
    var c = randInt(-5,300)
    return [a,b,c]
  }
  
  function randInt(a, b) { return Math.random() * (b - a + 1) + a | 0 }
  
  function randomAssertSimilar(generator, userSolution, referenceSolution, tests){
    tests = tests || 100;
    var user, reference, values;
    while( tests --> 0){
      values = generator();
      reference = referenceSolution.apply(this, values);
      user      = userSolution.apply(this,      values);
      Test.assertEquals(user, reference, "didn't work on the following argument array: " + values);
    }
  }
  
  it("Random Tests", function () {  
    randomAssertSimilar(generator, rgb, rgbReference);
  });
  
  });
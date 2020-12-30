/*

The Fibonacci numbers are the numbers in the following integer sequence (Fn):

0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, ...

such as

F(n) = F(n-1) + F(n-2) with F(0) = 0 and F(1) = 1.

Given a number, say prod (for product), we search two Fibonacci numbers F(n) and F(n+1) verifying

F(n) * F(n+1) = prod.

Your function productFib takes an integer (prod) and returns an array:

[F(n), F(n+1), true] or {F(n), F(n+1), 1} or (F(n), F(n+1), True)
depending on the language if F(n) * F(n+1) = prod.

If you don't find two consecutive F(m) verifying F(m) * F(m+1) = prodyou will return

[F(m), F(m+1), false] or {F(n), F(n+1), 0} or (F(n), F(n+1), False)
F(m) being the smallest one such as F(m) * F(m+1) > prod.

Some Examples of Return:
(depend on the language)

productFib(714) # should return (21, 34, true), 
                # since F(8) = 21, F(9) = 34 and 714 = 21 * 34

productFib(800) # should return (34, 55, false), 
                # since F(8) = 21, F(9) = 34, F(10) = 55 and 21 * 34 < 800 < 34 * 55
-----
productFib(714) # should return [21, 34, true], 
productFib(800) # should return [34, 55, false], 
-----
productFib(714) # should return {21, 34, 1}, 
productFib(800) # should return {34, 55, 0},        
-----
productFib(714) # should return {21, 34, true}, 
productFib(800) # should return {34, 55, false}, 

Note:
You can see examples for your language in "Sample Tests".


*/

function productFib(prod) {
    const fib = [0, 1];
    const outPut = [];
    for (let i = 2; i <= Math.round(Math.sqrt(84049690)); i++) {
        // Next fibonacci number = previous + one before previous
        // Translated to JavaScript:
        fib[i] = fib[i - 2] + fib[i - 1];

        const kq = fib[i - 1] * fib[i];

        if (kq > prod) {
            outPut.push(fib[i - 1]);
            outPut.push(fib[i]);
            outPut.push(false);
            break;
        }

        if (kq === prod) {
            outPut.push(fib[i - 1]);
            outPut.push(fib[i]);
            outPut.push(true);
            break;
        }
    }

    return outPut;
}

// ---------------------------------------------Testing----------------------------------------------
Test.assertSimilar(productFib(4895), [55, 89, true])
Test.assertSimilar(productFib(5895), [89, 144, false])
Test.assertSimilar(productFib(74049690), [6765, 10946, true])
Test.assertSimilar(productFib(84049690), [10946, 17711, false])
Test.assertSimilar(productFib(193864606), [10946, 17711, true])
Test.assertSimilar(productFib(447577), [610, 987, false])
Test.assertSimilar(productFib(602070), [610, 987, true])


// ---------------------------------------------Other Solution-------------------------------------------

// 1
function productFib(prod) {
    var n = 0;
    var nPlus = 1;
    while (n * nPlus < prod) {
        nPlus = n + nPlus;
        n = nPlus - n;
    }
    return [n, nPlus, n * nPlus === prod];
}


// 2
function productFib(prod) {
    let [a, b] = [0, 1];
    while (a * b < prod) [a, b] = [b, a + b];
    return [a, b, a * b === prod];
}
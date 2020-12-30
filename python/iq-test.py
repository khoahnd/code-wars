###Description:

#    Bob is preparing to pass IQ test. The most frequent task in this test is to find out which one of the given numbers differs from the others. Bob observed that one number usually differs from the others in evenness. Help Bob — to check his answers, he needs a program that among the given numbers finds one that is different in evenness, and return a position of this number.

#   ! Keep in mind that your task is to help Bob solve a real IQ test, which means indexes of the elements start from 1 (not 0)

##Examples :

# iq_test("2 4 7 8 10") => 3 // Third number is odd, while the rest of the numbers are even

# iq_test("1 2 1 1") => 2 // Second number is even, while the rest of the numbers are odd

def iq_test(numbers):
    arr = numbers.split(' ')
    kq = 0
    for idx, val in enumerate(arr):
        next = arr[idx + 1 if idx + 1 < len(arr) - 1 else len(arr) - 1]
        last = arr[len(arr) - 1]
        if int(arr[idx]) % 2 == int(next) % 2 and int(arr[idx]) % 2 != int(last) % 2 and int(next) != int(last) % 2:
            kq = len(arr)
            break
        else:
            if int(val) % 2 == int(last) % 2:
        	    continue
            else:
        	    kq = idx + 1
    return kq


# ------------------------------------------------------------Testing----------------------------------------------------

Test.assert_equals(iq_test("2 4 7 8 10"),3)
Test.assert_equals(iq_test("1 2 2"), 1)

# ------------------------------------------------------------Other Solution----------------------------------------------

# 1

def iq_test(numbers):
    e = [int(i) % 2 == 0 for i in numbers.split()]

    return e.index(True) + 1 if e.count(True) == 1 else e.index(False) + 1


# 2

def iq_test(n):
    n = [int(i)%2 for i in n.split()]
    if n.count(0)>1:
        return n.index(1)+1
    else:
        return n.index(0)+1
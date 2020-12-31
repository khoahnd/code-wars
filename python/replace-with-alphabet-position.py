"""
Welcome.

In this kata you are required to, given a string, replace every letter with its position in the alphabet.

If anything in the text isn't a letter, ignore it and don't return it.

"a" = 1, "b" = 2, etc.

- Example
    alphabet_position("The sunset sets at twelve o' clock.")
    Should return "20 8 5 19 21 14 19 5 20 19 5 20 19 1 20 20 23 5 12 22 5 15 3 12 15 3 11" (as a string)

"""
import string

def alphabet_position(text):
    alphabeths = {v: k for k, v in enumerate(string.ascii_lowercase, start=1)}
    return " ".join(str(alphabeths.get(char)) for char in text.lower() if char in alphabeths.keys())

# ------------------------------------------------------------Testing----------------------------------------------------

from random import randint
test.assert_equals(alphabet_position("The sunset sets at twelve o' clock."), "20 8 5 19 21 14 19 5 20 19 5 20 19 1 20 20 23 5 12 22 5 15 3 12 15 3 11")
test.assert_equals(alphabet_position("The narwhal bacons at midnight."), "20 8 5 14 1 18 23 8 1 12 2 1 3 15 14 19 1 20 13 9 4 14 9 7 8 20")

number_test = ""
for item in range(10):
    number_test += str(randint(1, 9))
test.assert_equals(alphabet_position(number_test), "")

# ------------------------------------------------------------Other Solution----------------------------------------------

# 1

def alphabet_position(text):
    return ' '.join(str(ord(c) - 96) for c in text.lower() if c.isalpha())

# 2

def alphabet_position(s):
  return " ".join(str(ord(c)-ord("a")+1) for c in s.lower() if c.isalpha())
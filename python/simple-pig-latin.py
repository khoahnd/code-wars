"""
Move the first letter of each word to the end of it, then add "ay" to the end of the word. Leave punctuation marks untouched.
Examples:

    pig_it('Pig latin is cool') # igPay atinlay siay oolcay
    pig_it('Hello world !')     # elloHay orldway !
"""
import re

def pig_it(text):
    regex = re.compile('[@_!#$%^&*()<>?/\|}{~:]')
    return ' '.join([item[1:] + item[0] + 'ay' if regex.search(item) == None else item for item in text.split()])


# ------------------------------------------------------------Testing----------------------------------------------------

Test.assert_equals(pig_it('Pig latin is cool'),'igPay atinlay siay oolcay')
Test.assert_equals(pig_it('This is my string'),'hisTay siay ymay tringsay')

# ------------------------------------------------------------Other Solution----------------------------------------------

# 1

def pig_it(text):
    lst = text.split()
    return ' '.join( [word[1:] + word[:1] + 'ay' if word.isalpha() else word for word in lst])

# 2

def pig_it(text):
    return " ".join(x[1:] + x[0] + "ay" if x.isalnum() else x for x in text.split())
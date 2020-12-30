# https://www.codewars.com/kata/53368a47e38700bd8300030d/solutions/python

# Description:
# Given: an array containing hashes of names

# Return: a string formatted as a list of names separated by commas except for the last two names, which should be separated by an ampersand.

# Example:

# namelist([ {'name': 'Bart'}, {'name': 'Lisa'}, {'name': 'Maggie'} ])
# # returns 'Bart, Lisa & Maggie'

# namelist([ {'name': 'Bart'}, {'name': 'Lisa'} ])
# # returns 'Bart & Lisa'

# namelist([ {'name': 'Bart'} ])
# # returns 'Bart'

# namelist([])
# # returns ''
# Note: all the hashes are pre-validated and will only contain A-Z, a-z, '-' and '.'.

def namelist(names):
    if len(names) == 0: return ''
    newStr = ''
    for idx, target_list in enumerate(names):
        if idx == 0:
            newStr += target_list.get('name', None)
        elif target_list == names[(len(names) - 1)]:
            newStr += ' & ' + target_list.get('name', None)
        else:
            newStr += ', ' + target_list.get('name', None)
    return newStr.strip()


print(namelist([{'name': 'Bart'},{'name': 'Lisa'},{'name': 'Maggie'},{'name': 'Homer'},{'name': 'Marge'}]))



# ------------------------------------------------------------Testing----------------------------------------------------

Test.assert_equals(namelist([{'name': 'Bart'},{'name': 'Lisa'},{'name': 'Maggie'},{'name': 'Homer'},{'name': 'Marge'}]), 'Bart, Lisa, Maggie, Homer & Marge',
"Must work with many names")
Test.assert_equals(namelist([{'name': 'Bart'},{'name': 'Lisa'},{'name': 'Maggie'}]), 'Bart, Lisa & Maggie',
"Must work with many names")
Test.assert_equals(namelist([{'name': 'Bart'},{'name': 'Lisa'}]), 'Bart & Lisa', 
"Must work with two names")
Test.assert_equals(namelist([{'name': 'Bart'}]), 'Bart', "Wrong output for a single name")
Test.assert_equals(namelist([]), '', "Must work with no names")

# ------------------------------------------------------------Other Solution---------------------------------------------

# 1

def namelist(names):
    if len(names) > 1:
        return '{} & {}'.format(', '.join(name['name'] for name in names[:-1]), names[-1]['name'])
    elif names:
        return names[0]['name']
    else:
        return ''


# 2

def namelist(names):
    if len(names)==0: return ''
    if len(names)==1: return names[0]['name']
    return ', '.join([n['name'] for n in names[:-1]]) + ' & ' + names[-1]['name']
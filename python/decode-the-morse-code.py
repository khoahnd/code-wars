
# In this kata you have to write a simple Morse code decoder. While the Morse code is now mostly superseded by voice and digital data communication channels, it still has its use in some applications around the world.
# The Morse code encodes every character as a sequence of "dots" and "dashes". For example, the letter A is coded as ·−, letter Q is coded as −−·−, and digit 1 is coded as ·−−−−. The Morse code is case-insensitive, traditionally capital letters are used. When the message is written in Morse code, a single space is used to separate the character codes and 3 spaces are used to separate words. For example, the message HEY JUDE in Morse code is ···· · −·−−   ·−−− ··− −·· ·.

# NOTE: Extra spaces before or after the code have no meaning and should be ignored.

# In addition to letters, digits and some punctuation, there are some special service codes, the most notorious of those is the international distress signal SOS (that was first issued by Titanic), that is coded as ···−−−···. These special codes are treated as single special characters, and usually are transmitted as separate words.

# Your task is to implement a function that would take the morse code as input and return a decoded human-readable string.

# For example:

# decodeMorse('.... . -.--   .--- ..- -.. .')
# #should return "HEY JUDE"
# NOTE: For coding purposes you have to use ASCII characters . and -, not Unicode characters.

# The Morse code table is preloaded for you as a dictionary, feel free to use it:

# Coffeescript/C++/Go/JavaScript/Julia/PHP/Python/Ruby/TypeScript: MORSE_CODE['.--']
# C#: MorseCode.Get(".--") (returns string)
# Elixir: @morse_codes variable (from use MorseCode.Constants). Ignore the unused variable warning for morse_codes because it's no longer used and kept only for old solutions.
# Elm: MorseCodes.get : Dict String String
# Haskell: morseCodes ! ".--" (Codes are in a Map String String)
# Java: MorseCode.get(".--")
# Kotlin: MorseCode[".--"] ?: "" or MorseCode.getOrDefault(".--", "")
# Rust: self.morse_code
# Scala: morseCodes(".--")
# Swift: MorseCode[".--"] ?? "" or MorseCode[".--", default: ""]
# C: provides parallel arrays, i.e. morse[2] == "-.-" for ascii[2] == "C"
# All the test strings would contain valid Morse code, so you may skip checking for errors and exceptions. In C#, tests will fail if the solution code throws an exception, please keep that in mind. This is mostly because otherwise the engine would simply ignore the tests, resulting in a "valid" solution.

# Good luck!

# After you complete this kata, you may try yourself at Decode the Morse code, advanced.



MORSE_CODE = {"-.-.-.":";","-...-":"=","---":"O","----.":"9","-..-.":"/",".-...":"&","...--":"3",".--":"W","--":"M","--..":"Z",".----.":"'","-.-.--":"!","-...":"B","..-":"U",".----":"1","-.--.-":")",".-":"A","-....-":"-","...-":"V","...---...":"SOS","-.--":"Y","..":"I","--.-":"Q","-.":"N","..---":"2","-....":"6","---...":",",".-.-.":"+",".--.-.":"@","....-":"4","-----":"0",".-.-.-":".","-.-.":"C",".":"E","..-.":"F",".---":"J","-.-":"K",".-..":"L",".-.":"R","...":"S","--.":"G","---..":"8","..--..":"?","-.--.":"(",".--.":"P",".....":"5","..--.-":"_","-..":"D",".-..-.":"\"","-":"T","....":"H","--..--":",","...-..-":"$","--...":"7","-..-":"X"}

def decodeMorse(morse_code):
    morse_code = morse_code.strip()
    morse_code.strip()
    arr = morse_code.split('   ')
    return ' '.join(list(map(processItem, arr)));

def processItem(x):
    return ''.join(list(map(morse_to_character, x.split(' '))))

def morse_to_character(y):
    return MORSE_CODE[y]

# ------------------------------------------------------------Testing----------------------------------------------------

def test_and_print(got, expected):
    if got == expected:
        test.expect(True)
    else:
        print("<pre style='display:inline'>Got {}, expected {}</pre>".format(got, expected))
        test.expect(False)

test.describe("Example from description")
test_and_print(decodeMorse('.... . -.--   .--- ..- -.. .'), 'HEY JUDE')

# ------------------------------------------------------------Other Solution----------------------------------------------

# 1

def decodeMorse(morseCode):
    return ' '.join(''.join(MORSE_CODE[letter] for letter in word.split(' ')) for word in morseCode.strip().split('   '))


# 2

def decodeMorse(morse_sequence):
    words = []
    for morse_word in morse_sequence.split('   '):
        word = ''.join(MORSE_CODE.get(morse_char, '') for morse_char in morse_word.split(' '))
        if word:
            words.append(word)
    return ' '.join(words)
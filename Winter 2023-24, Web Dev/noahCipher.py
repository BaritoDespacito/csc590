import string

# Define the dictionary with letters and their corresponding values.
letterNums = {}
number = 1
for letter in string.ascii_lowercase:
    letterNums[letter] = number
    number += 1

# Take the user's plaintext input.
plainText = input('Please enter your message.')

# Convert user plaintext to numbers, and increment each number.
cipherText = ''
increment = 1
for letter in plainText:
    letterNum = letterNums[letter]
    letterNum += increment
    cipherText += (str(letterNum)+' ')
    increment += 1

print('Your result is', cipherText)

import json
from random import randint

# Picks a random word/element from a given array
def pick_word(words_list):
    index = randint(0, len(words_list)-1)
    return words_list[index]

def hide_word(word):
    display = []
    for x in word:
        display.append("_")
    return " ".join(display)
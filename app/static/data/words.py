# Python program to convert text file to JSON
import json
 
# Txt file to be converted to JSON format
filename = 'words.txt'
 
# Dictionary where the lines from text will be stored 
dict1 = {}
# The key "words" where line will be stored as elements in the value array
dict1["words"] = []

# Opening the txt file, reading each line, and appending the word into the value array
with open(filename) as fh:
    for line in fh:
        # removing the "\n" new line from the end of each line before adding
        line = line. rstrip('\n')
        # ensure words are at least 3 letters long
        if len(line) >= 3:
            dict1["words"].append(line)
 
# Creating json file "words.json" 
out_file = open("words.json", "w")
json.dump(dict1, out_file, indent = 4, sort_keys = False)
out_file.close()
# A simple script to convert text files (one word per line)
# into JavaScript array files.

import os

def convert_txt_to_js(input_filename, output_filename, variable_name):
    """
    Reads a text file and writes a JavaScript file containing an array.
    """
    print(f"Starting conversion of {input_filename} -> {output_filename}...")
    
    try:
        # We use 'with' to ensure files are closed automatically
        with open(input_filename, 'r') as infile, open(output_filename, 'w') as outfile:
            
            # Write the start of the JavaScript array
            outfile.write(f"const {variable_name} = [\n")
            
            # Read all lines from the text file
            words = infile.readlines()
            
            # Loop through each word, format it, and write it to the JS file
            for i, word in enumerate(words):
                # .strip() removes any whitespace or newline characters
                clean_word = word.strip()
                
                if clean_word:  # Make sure the word is not an empty line
                    # Format as:    "word",
                    line_to_write = f'    "{clean_word}"'
                    
                    # Add a comma to all lines except the very last one
                    if i < len(words) - 1:
                        line_to_write += ','
                    
                    outfile.write(line_to_write + '\n')
            
            # Write the end of the JavaScript array
            outfile.write("];\n")
            
        print(f"Successfully created {output_filename}!")

    except FileNotFoundError:
        print(f"ERROR: Could not find the input file: {input_filename}")
        print("Please make sure it's in the same directory as this script.")

# --- Main part of the script that runs the conversions ---
if __name__ == "__main__":
    convert_txt_to_js('adjectives.txt', 'adjectives.js', 'adjectives')
    print("-" * 20)
    convert_txt_to_js('nouns.txt', 'nouns.js', 'nouns')
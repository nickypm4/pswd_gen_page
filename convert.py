import os

def convert_txt_to_js(input_filename, output_filename, variable_name):
    """
    Reads a text file and writes a JavaScript file containing an array.
    """
    print(f"Starting conversion of {input_filename} -> {output_filename}...")
    
    try:
        with open(input_filename, 'r') as infile, open(output_filename, 'w') as outfile:
            
            outfile.write(f"const {variable_name} = [\n")
            
            words = infile.readlines()
            
            for i, word in enumerate(words):
                clean_word = word.strip()
                
                if clean_word:
                    line_to_write = f'    "{clean_word}"'
                    
                    if i < len(words) - 1:
                        line_to_write += ','
                    
                    outfile.write(line_to_write + '\n')
            
            outfile.write("];\n")
            
        print(f"Successfully created {output_filename}!")

    except FileNotFoundError:
        print(f"ERROR: Could not find the input file: {input_filename}")
        print("Please make sure it's in the same directory as this script.")

if __name__ == "__main__":
    convert_txt_to_js('adjectives.txt', 'adjectives.js', 'adjectives')
    print("-" * 20)
    convert_txt_to_js('nouns.txt', 'nouns.js', 'nouns')
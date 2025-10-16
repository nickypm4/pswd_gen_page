document.addEventListener('DOMContentLoaded', () => {

    // --- CONFIGURATION: Set the absolute allowed limits ---
    const MIN_PASSWORDS_ALLOWED = 1;
    const MAX_PASSWORDS_ALLOWED = 100;
    const MIN_LENGTH_ALLOWED = 5;
    const MAX_LENGTH_ALLOWED = 30;

    // --- Get references to all the HTML elements ---
    const generateBtn = document.getElementById('generateBtn');
    const resultsOutput = document.getElementById('resultsOutput');
    const numPasswordsInput = document.getElementById('numPasswords');
    const minLengthInput = document.getElementById('minLength');
    const maxLengthInput = document.getElementById('maxLength');
    const errorMessage = document.getElementById('error-message');

    /**
     * Generates a single password within the specified length constraints.
     */
    function generatePassword(minLength, maxLength) {
        // Safety break to prevent infinite loops (e.g., if constraints are impossible)
        for (let i = 0; i < 10000; i++) {
            const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
            const noun = nouns[Math.floor(Math.random() * nouns.length)];
            const num = String(Math.floor(Math.random() * 1000)).padStart(3, '0');

            const password = (adj + noun + num).toLowerCase();

            if (password.length >= minLength && password.length <= maxLength) {
                return password;
            }
        }
        return "[Failed: Try wider length constraints]";
    }

    /**
     * Main function to handle the button click and validate inputs.
     */
    function handleGenerateClick() {
        // 1. Clear any old errors
        errorMessage.textContent = '';

        // 2. Read and validate the input values
        let numToGenerate = parseInt(numPasswordsInput.value, 10);
        let minLength = parseInt(minLengthInput.value, 10);
        let maxLength = parseInt(maxLengthInput.value, 10);

        // Check for logical errors
        if (minLength > maxLength) {
            errorMessage.textContent = 'Error: Min length cannot be greater than Max length.';
            return; // Stop execution
        }

        // 3. Enforce our absolute min/max limits (clamping)
        numToGenerate = Math.max(MIN_PASSWORDS_ALLOWED, Math.min(numToGenerate, MAX_PASSWORDS_ALLOWED));
        minLength = Math.max(MIN_LENGTH_ALLOWED, Math.min(minLength, MAX_LENGTH_ALLOWED));
        maxLength = Math.max(MIN_LENGTH_ALLOWED, Math.min(maxLength, MAX_LENGTH_ALLOWED));
        
        // 4. (Optional) Update the input fields to show the user the clamped values
        numPasswordsInput.value = numToGenerate;
        minLengthInput.value = minLength;
        maxLengthInput.value = maxLength;

        // 5. Generate and display the passwords
        let output = '';
        for (let i = 0; i < numToGenerate; i++) {
            const password = generatePassword(minLength, maxLength);
            output += password + '\n';
        }
        resultsOutput.textContent = output;
    }

    // Attach the function to the button's click event
    generateBtn.addEventListener('click', handleGenerateClick);

    // Generate some passwords on initial page load for a nice first impression
    handleGenerateClick();
});
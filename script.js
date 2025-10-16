document.addEventListener('DOMContentLoaded', () => {

    const MIN_PASSWORDS_ALLOWED = 1;
    const MAX_PASSWORDS_ALLOWED = 100;
    const MIN_LENGTH_ALLOWED = 5;
    const MAX_LENGTH_ALLOWED = 30;

    const generateBtn = document.getElementById('generateBtn');
    const resultsOutput = document.getElementById('resultsOutput');
    const numPasswordsInput = document.getElementById('numPasswords');
    const minLengthInput = document.getElementById('minLength');
    const maxLengthInput = document.getElementById('maxLength');
    const errorMessage = document.getElementById('error-message');

    function generatePasswordCandidate() {
        const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
        const noun = nouns[Math.floor(Math.random() * nouns.length)];
        const num = String(Math.floor(Math.random() * 1000)).padStart(3, '0');
        return (adj + noun + num).toLowerCase();
    }

    function handleGenerateClick() {
        // 1. Clear old state
        errorMessage.textContent = '';
        resultsOutput.textContent = '';

        // 2. Validate inputs
        let numToGenerate = parseInt(numPasswordsInput.value, 10);
        let minLength = parseInt(minLengthInput.value, 10);
        let maxLength = parseInt(maxLengthInput.value, 10);

        if (minLength > maxLength) {
            errorMessage.textContent = 'Error: Min length cannot be greater than Max length.';
            return;
        }

        // 3. Clamp values to safe limits
        numToGenerate = Math.max(MIN_PASSWORDS_ALLOWED, Math.min(numToGenerate, MAX_PASSWORDS_ALLOWED));
        minLength = Math.max(MIN_LENGTH_ALLOWED, Math.min(minLength, MAX_LENGTH_ALLOWED));
        maxLength = Math.max(MIN_LENGTH_ALLOWED, Math.min(maxLength, MAX_LENGTH_ALLOWED));
        
        numPasswordsInput.value = numToGenerate;
        minLengthInput.value = minLength;
        maxLengthInput.value = maxLength;

        // 4. Reliable generation loop
        const foundPasswords = [];
        let attempts = 0;
        // INCREASED PATIENCE: The safety break is now much higher.
        const maxAttempts = 250000; 

        while (foundPasswords.length < numToGenerate && attempts < maxAttempts) {
            const password = generatePasswordCandidate();
            if (password.length >= minLength && password.length <= maxLength) {
                foundPasswords.push(password);
            }
            attempts++;
        }

        // Final reporting: Either show results OR an error inside the results box.
        if (foundPasswords.length < numToGenerate) {
            // FAILURE CASE: Put the error text directly into the results box.
            resultsOutput.textContent = "Failed to find enough passwords...\n\nPlease try wider length constraints\nor a smaller amount.";
            // Add a CSS class to make the text look like an error.
            resultsOutput.classList.add('error-text');
        } else {
            // SUCCESS CASE: Put the passwords in the results box.
            resultsOutput.textContent = foundPasswords.join('\n');
            // IMPORTANT: Remove the error class in case the previous run failed.
            resultsOutput.classList.remove('error-text');
        }
    }

    generateBtn.addEventListener('click', handleGenerateClick);
    handleGenerateClick();
});
// Configuration of the puzzle
const SECRET_MESSAGE = "EL LUGAR DEL ENCUENTRO SERA EL AUDITORIO";
const CORRECT_KEY = "TARARA";

// Vigenère Cipher implementation (supports Spanish alphabet A-Z)
const ALPHABET = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";

function vigenereDecrypt(ciphertext, key) {
    let result = "";
    let keyIndex = 0;
    const cleanKey = key.toUpperCase().replace(/[^A-Z]/g, "");

    if (!cleanKey) return ciphertext;

    for (let i = 0; i < ciphertext.length; i++) {
        const char = ciphertext[i];
        const upperChar = char.toUpperCase();
        const charIndex = ALPHABET.indexOf(upperChar);

        if (charIndex !== -1) {
            const keyChar = cleanKey[keyIndex % cleanKey.length];
            const keyShift = ALPHABET.indexOf(keyChar);

            let decryptedIndex = (charIndex - keyShift + ALPHABET.length) % ALPHABET.length;
            const decryptedChar = ALPHABET[decryptedIndex];

            // Preserve case
            result += (char === upperChar) ? decryptedChar : decryptedChar.toLowerCase();
            keyIndex++;
        } else {
            // Keep spaces, numbers, punctuation as is
            result += char;
        }
    }
    return result;
}

function vigenereEncrypt(text, key) {
    let result = "";
    let keyIndex = 0;
    const cleanKey = key.toUpperCase().replace(/[^A-Z]/g, "");

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const upperChar = char.toUpperCase();
        const charIndex = ALPHABET.indexOf(upperChar);

        if (charIndex !== -1) {
            const keyChar = cleanKey[keyIndex % cleanKey.length];
            const keyShift = ALPHABET.indexOf(keyChar);

            let encryptedIndex = (charIndex + keyShift) % ALPHABET.length;
            const encryptedChar = ALPHABET[encryptedIndex];

            result += (char === upperChar) ? encryptedChar : encryptedChar.toLowerCase();
            keyIndex++;
        } else {
            result += char;
        }
    }
    return result;
}

// Initialize cipher text on load
const ciphertextDisplay = document.getElementById("ciphertextDisplay");
const keyInput = document.getElementById("keyInput");
const decryptBtn = document.getElementById("decryptBtn");
const resetBtn = document.getElementById("resetBtn");
const resultDisplay = document.getElementById("resultDisplay");
const successModal = document.getElementById("successModal");
const finalDecryptedMessage = document.getElementById("finalDecryptedMessage");
const closeModalBtn = document.getElementById("closeModalBtn");

const encryptedText = vigenereEncrypt(SECRET_MESSAGE, CORRECT_KEY);
ciphertextDisplay.textContent = encryptedText;

// Decrypt action
function handleDecrypt() {
    const userKey = keyInput.value.trim();
    if (!userKey) {
        resultDisplay.innerHTML = '<span class="placeholder-text" style="color: #ef4444;">Por favor, introduce una palabra clave.</span>';
        return;
    }

    const decrypted = vigenereDecrypt(encryptedText, userKey);
    resultDisplay.textContent = decrypted;
    resultDisplay.classList.remove("placeholder-text");

    // Check if correct
    if (userKey.toUpperCase() === CORRECT_KEY) {
        finalDecryptedMessage.textContent = decrypted;
        successModal.classList.remove("hidden");
    }
}

decryptBtn.addEventListener("click", handleDecrypt);
keyInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        handleDecrypt();
    }
});

resetBtn.addEventListener("click", () => {
    keyInput.value = "";
    resultDisplay.innerHTML = '<span class="placeholder-text">El mensaje descifrado aparecerá aquí...</span>';
});

closeModalBtn.addEventListener("click", () => {
    successModal.classList.add("hidden");
});

// Hint toggle function
function toggleHint(hintNumber) {
    const hintContent = document.getElementById(`hint${hintNumber}`);
    hintContent.classList.toggle("hidden");
}

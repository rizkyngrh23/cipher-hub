import {
  caesarCipher,
  symbolCipher,
  reverseCipher,
  binaryCode,
  decodeBinaryCode,
  tapCode,
  decodeTapCode,
  morseCode,
  decodeMorseCode
} from './encryption.js';

const encodeMessage = (str, shift) => reverseCipher(symbolCipher(caesarCipher(str, shift)));
const decodeMessage = (str, shift) => caesarCipher(symbolCipher(reverseCipher(str)), -shift);

const logActivity = (action, message) => {
  const log = document.getElementById('activityLog');
  const entry = document.createElement('li');
  entry.textContent = `${new Date().toLocaleTimeString()} - ${action}: "${message}"`;
  log.insertBefore(entry, log.firstChild);
  if (log.children.length > 5) {
    log.removeChild(log.lastChild);
  }
};

const validateInput = (input) => {
  const regex = /^[\s\S]*$/;
  return regex.test(input);
};

const toggleCaesarShiftVisibility = () => {
  const selectedCipher = document.getElementById('cipherSelect').value;
  const caesarSection = document.querySelector('.caesar-section');

  if (selectedCipher === 'caesar' || selectedCipher === 'super') {
    caesarSection.style.display = 'block'; 
  } else {
    caesarSection.style.display = 'none';
  }
};

toggleCaesarShiftVisibility();

document.getElementById('cipherSelect').addEventListener('change', toggleCaesarShiftVisibility);

document.getElementById('encodeButton').addEventListener('click', () => {
  const input = document.getElementById('messageInput').value;
  const selectedCipher = document.getElementById('cipherSelect').value;
  const shift = parseInt(document.getElementById('caesarShift').value);

  if (!validateInput(input)) {
    alert("Invalid input. Please enter a valid message.");
    return;
  }

  let output;
  if (selectedCipher === 'caesar') {
    output = encodeMessage(input, shift);
  } else if (selectedCipher === 'symbol') {
    output = symbolCipher(input);
  } else if (selectedCipher === 'reverse') {
    output = reverseCipher(input);
  } else if (selectedCipher === 'binary') {
    output = binaryCode(input);
  } else if (selectedCipher === 'tap') {
    output = tapCode(input);
  } else if (selectedCipher === 'morse') {
    output = morseCode(input);
  } else if (selectedCipher === 'super') {
    output = encodeMessage(input, shift);
  }

  document.getElementById('resultOutput').value = output;
  logActivity("Encoded", input);
});

document.getElementById('decodeButton').addEventListener('click', () => {
  const input = document.getElementById('messageInput').value;
  const selectedCipher = document.getElementById('cipherSelect').value;
  const shift = parseInt(document.getElementById('caesarShift').value);

  if (!validateInput(input)) {
    alert("Invalid input. Please enter a valid message.");
    return;
  }

  let output;
  if (selectedCipher === 'caesar') {
    output = decodeMessage(input, shift);
  } else if (selectedCipher === 'symbol') {
    output = reverseCipher(input);
  } else if (selectedCipher === 'reverse') {
    output = reverseCipher(input);
  } else if (selectedCipher === 'binary') {
    output = decodeBinaryCode(input);
  } else if (selectedCipher === 'tap') {
    output = decodeTapCode(input);
  } else if (selectedCipher === 'morse') {
    output = decodeMorseCode(input);
  } else if (selectedCipher === 'super') {
    output = decodeMessage(input, shift);
  }

  document.getElementById('resultOutput').value = output;
  logActivity("Decoded", input);
});

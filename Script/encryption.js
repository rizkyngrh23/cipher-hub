export const caesarCipher = (str, shift) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const shiftedAlphabet = alphabet.slice(shift) + alphabet.slice(0, shift);
  return str.toUpperCase().split('').map(char => {
      const index = alphabet.indexOf(char);
      return index !== -1 ? shiftedAlphabet[index] : char;
  }).join('');
};

export const symbolCipher = (str) => {
  const symbols = {
      'A': '@', 'B': '8', 'C': '(', 'D': 'D', 'E': '3', 'F': 'F', 'G': '9',
      'H': '#', 'I': '!', 'J': '}', 'K': 'K', 'L': '1', 'M': 'M', 'N': 'N',
      'O': '0', 'P': 'P', 'Q': 'Q', 'R': '2', 'S': '5', 'T': '7', 'U': 'U',
      'V': 'V', 'W': 'W', 'X': 'X', 'Y': 'Y', 'Z': 'Z'
  };
  return str.toUpperCase().split('').map(char => symbols[char] || char).join('');
};

export const reverseCipher = (str) => str.split('').reverse().join('');

export const binaryCode = (str) => {
  return str.split('').map(char => {
      return char.charCodeAt(0).toString(2).padStart(8, '0');
  }).join(' ');
};

export const decodeBinaryCode = (binaryStr) => {
  return binaryStr.split(' ').map(bin => String.fromCharCode(parseInt(bin, 2))).join('');
};

const tapCodeKey = [
  ['A', 'B', 'C', 'D', 'E'],
  ['F', 'G', 'H', 'I', 'J'],
  ['K', 'L', 'M', 'N', 'O'],
  ['P', 'Q', 'R', 'S', 'T'],
  ['U', 'V', 'W', 'X', 'Y'],
  ['Z']
];

export const tapCode = (str) => {
  const tapCodeMap = {};
  tapCodeKey.forEach((row, rIndex) => {
      row.forEach((char, cIndex) => {
          tapCodeMap[char] = `${rIndex + 1}${cIndex + 1}`;
      });
  });

  return str.toUpperCase().split('').map(char => tapCodeMap[char] || char).join(' ');
};

export const decodeTapCode = (tapStr) => {
  const tapCodeMap = {};
  tapCodeKey.forEach((row, rIndex) => {
      row.forEach((char, cIndex) => {
          tapCodeMap[`${rIndex + 1}${cIndex + 1}`] = char;
      });
  });

  return tapStr.split(' ').map(code => tapCodeMap[code] || code).join('');
};

const morseCodeMap = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
  '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
  '8': '---..', '9': '----.'
};

export const morseCode = (str) => {
  return str.toUpperCase().split('').map(char => morseCodeMap[char] || char).join(' ');
};

export const decodeMorseCode = (morseStr) => {
  const morseToCharMap = Object.fromEntries(Object.entries(morseCodeMap).map(([k, v]) => [v, k]));
  return morseStr.split(' ').map(code => morseToCharMap[code] || code).join('');
};


const hexTable = {
  10: 'A',
  11: 'B',
  12: 'C',
  13: 'D',
  14: 'E',
  15: 'F',
};

function generateRandomInt() {
  return Math.floor(Math.random() * 16);
}

function convertToHex(inputArray: number[]) {
  return inputArray.map((int) => {
    if (int >= 0 && int <= 9) {
      return int;
    }
    return hexTable[int];
  });
}

export default function generateHexValue() {
  const hexArray = [];
  for (let i = 0; i < 6; i++) {
    hexArray.push(generateRandomInt());
  }
  return convertToHex(hexArray).join('');
}

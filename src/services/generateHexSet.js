import generateHexValue from './generateHexValue';

export default function generateHexSet() {
  const result = [];
  for (let i = 0; i < 3; i++) {
    result.push(generateHexValue());
  }
  return result;
}

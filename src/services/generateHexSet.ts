import generateHexValue from './generateHexValue';

export default function generateHexSet(num) {
  const result = [];

  for (let i = 0; i < num; i++) {
    result.push(generateHexValue());
  }
  return result;
}

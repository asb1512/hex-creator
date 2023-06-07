type Difficulty = 3 | 5 | 7;

export default function generateCorrectColor(num: Difficulty) {
  return Math.floor(Math.random() * num);
}

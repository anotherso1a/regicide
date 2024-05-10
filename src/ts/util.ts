// const rp = require('readline/promises')

export function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function isSamePropertyValue<T>(arr: T[], property: keyof T) {
  const firstValue = arr[0][property];
  return arr.every((item) => item[property] === firstValue);
}

// async function requireInput(msg) {
//   const rl = rp.createInterface({
//     input: process.stdin,
//     output: process.stdout
//   })
//   let res = await rl.question(msg);
//   rl.close()
//   return res
// }

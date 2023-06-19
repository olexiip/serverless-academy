import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const frstMsg = "Hello! I'll sort imputed data(separated by spaces)";
const askDataMsg = `
print data:`;
const askSortTypeMsg = `
choose a sort type:
1 - Sort words alphabetically
2 - Show numbers from lesser to greater
3 - Show numbers from bigger to smaller
4 - Display words in ascending order by number of letters in the word
5 - Show only unique words
6 - Display only unique values from the set of words and numbers entered by the user
exit - exit`;

const textColor1 = '\x1b[36m%s\x1b[0m'; //cyan
const textColor2 = "\x1b[33m%s\x1b[0m"; //yellow

const rl = readline.createInterface({ input, output });

const askData = async () => {
  console.log(textColor1, askDataMsg);
  const answer = await rl.question('> ');
  return answer;
}

const askSort = async () => {
  console.log(textColor1, askSortTypeMsg);
  const answer = await rl.question('> ');
  return answer;
}

const textToArr = (text) => {
  let arr;
  try {
    arr = text.split(" "); 
    console.log(textColor1, "You enter:");
    console.log(arr);
    return arr;
  } catch(e) {
    console.log(textColor2, "can't parse this data")
  }
}

const words = (arr) => {
  let newArr = arr.filter((element) => {
    return regWords.test(element);
  });
  return newArr;
}

const numbers = (arr) => {
  let newArr = [];
  arr.forEach((element) => {
    let elementD = +element;
    if (typeof(elementD) === 'number' && !isNaN(elementD)) {
      if ((elementD===0) && (element === "") ) {
        return;
      }
      newArr.push(elementD);
    };
  },0);
  return newArr;
}

let regWords = new RegExp('[A-z]');

const sort1 = (arr) => {
  const newArr = words(arr);
  newArr.sort();
  return newArr;
} 

const sort2 = (arr) => {
  const newArr = numbers(arr);
  newArr.sort((a,b) => a-b);
  return newArr;
} 

const sort3 = (arr) => {
  const newArr = numbers(arr);
  newArr.sort((a,b) => b-a);
  return newArr;
}

const sort4 = (arr) => {
  const newArr = words(arr);
  newArr.sort((a,b)=> (a.length-b.length))
  return newArr;
}
const sort5 = (arr) => {
  const newArr = words(arr);
  return [...new Set(newArr)];
}

const sort6 = (arr) => {
  return [...new Set(arr)];
}

const exitF = (data) => {
  if (data ==="exit") {
    console.log(textColor1,"by!");
    process.exit();
  }
}

const sortCombiner =  async (arr, sortType) => {
  switch (sortType) {
    case "1": 
      return sort1(arr);
    case "2": 
      return sort2(arr);
    case "3": 
      return sort3(arr);
    case "4": 
      return sort4(arr);
    case "5": 
      return sort5(arr);
    case "6": 
      return sort6(arr);
    default:
      console.log(textColor2,"I accept numbers 1-6 or 'exit'");
      sortType = await askSort();
      exitF(sortType);22
      return sortCombiner(arr, sortType);
  }
};

const loop = async () => {
  let data = await askData();
  exitF(data);
  let arr = textToArr(data);
  let sortType = await askSort();
  exitF(sortType);
  let res = await sortCombiner(arr, sortType);
  console.log(textColor1, "result:");
  console.log(res);
  loop();
} 

console.log(textColor1, frstMsg);
loop();

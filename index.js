/*
Лабораторная работа №2 по дисциплине МРЗВИС
Выполнена студентами группы 121702 БГУИР Летко Александр, Пилат Максим
Вариант 1: Вычисление матрицы значений C. 
1. (~) = x*y, /~\ = x*y, x~>y = 1+x*(y-1)

Алгоритма обсуждался вместе с Зайцем и Колтовичем
*/
const pInput = document.getElementById('p');
const qInput = document.getElementById('q');
const mInput = document.getElementById('m');
const nInput = document.getElementById('n');

const sumInput = document.getElementById('sum');
const diffInput = document.getElementById('diff');
const multInput = document.getElementById('mult');
const divInput = document.getElementById('div');

const globalState = {
  f: 0,
  d: 0,
  c: 0,
};

const TACT_SUM = 1;
const TACT_MULT = 1;
const TACT_DIFF = 1;
const TACT_DIV = 1;

let countOfSum = 0;
let countOfMult = 0;
let countOfDiv = 0;
let countOfDiff = 0;

let T = 0;
let Tn = 0;

const testButtonRef = document.getElementById('testButton');

testButtonRef.addEventListener('click', start);

// когда считаем k, мы считаем от 0 до m

let a = [];
let b = [];
let e = [];
let g = [];

let c = [];

function getRandNum() {
  return Number((Math.random() * 2 - 1).toFixed(3));
}

function fillMattrix(rows, columns) {
  let mattrix = [];
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < columns; j++) {
      row.push(getRandNum());
    }
    mattrix = [...mattrix, row];
  }
  return mattrix;
}

function calculateF(i, j, k) {
  // countOfMult += 7;
  // countOfSum += 2;
  // countOfDiff += 3;
  let oldT = getT();

  let countOfDiff = getCountOfDiff();
  let countOfSum = getCountOfSum();
  let countOfMult = getCountOfMult();

  let twoE0kMinus1 = difference(multiplication(2, e[0][k]), 1);
  let firstMultiplication = multiplication(
    multiplication(implication(a[i][k], b[k][j]), twoE0kMinus1),
    e[0][k],
  );

  let fourImplMinus2 = difference(multiplication(4, implication(a[i][k], b[k][j])), 2);
  let secondBracket = sum(1, multiplication(fourImplMinus2, e[0][k]));

  let res = Number(
    sum(
      firstMultiplication,
      multiplication(
        multiplication(implication(b[k][j], a[i][k]), secondBracket),
        difference(1, e[0][k]),
      ),
    ).toFixed(3),
  );

  Tn += Math.ceil(
    (getCountOfDiff() +
      getCountOfMult() +
      getCountOfSum() -
      countOfDiff -
      countOfSum -
      countOfMult) /
      nInput.value,
  );

  globalState.f += 1;

  return res;
}

function equialention(x, y) {
  return Number(multiplication(x, y).toFixed(3));
}

function conjunction(x, y) {
  return Number(multiplication(x, y).toFixed(3));
}

function implication(x, y) {
  return Number(sum(1, multiplication(x, difference(y, 1))).toFixed(3));
}

function sum(x, y) {
  countOfSum += 1;
  return x + y;
}

function difference(x, y) {
  countOfDiff += 1;
  return x - y;
}

function multiplication(x, y) {
  countOfMult += 1;
  return x * y;
}

function calculateMultiplicationRow(i, j) {
  let result = 1;
  // countOfMult += mInput.value - 1;

  let fValues = [];
  let multiplications = [];

  for (let index = 0; index < mInput.value; index++) {
    fValues.push(calculateF(i, j, index));
    // result = multiplication(result, calculateF(i, j, index));
  }
  for (let index = 0; index < mInput.value; index++) {
    multiplications.push(multiplication(1, fValues[index]));
  }
  result = multiplications.reduce((multipl, el) => el * multipl, 1);

  Tn += Math.ceil((1 * mInput.value) / nInput.value);
  // Tn += Math.floor((getT() - oldT) / nInput.value);
  return Number(result.toFixed(3));
}

function calculateCEl(i, j) {
  let oldT = getT();

  let oldCountOfMult = getCountOfMult();
  let oldCountOfDiff = getCountOfDiff();

  let firstMultiplicationBracket = multiplication(
    calculateMultiplicationRow(i, j),
    multiplication(difference(multiplication(3, g[i][j]), 2), g[i][j]),
  );

  let secondMultiplicationBracket = multiplication(
    4,
    difference(
      equialention(calculateMultiplicationRow(i, j), calculateD(i, j)),
      multiplication(3, calculateD(i, j)),
    ),
  );

  let secondPart = multiplication(
    difference(1, g[i][j]),
    sum(calculateD(i, j), multiplication(secondMultiplicationBracket, g[i][j])),
  );

  let res = Number(sum(firstMultiplicationBracket, secondPart).toFixed(3));
  Tn += Math.ceil(13 / nInput.value);
  globalState.c += 1;
  // Tn += Math.floor((getT() - oldT) / nInput.value);
  return res;
  // return Number(
  //   (
  //     calculateMultiplicationRow(i, j) * (3 * g[i][j] - 2) * g[i][j] +
  //     (1 - g[i][j]) *
  //       (calculateD(i, j) +
  //         4 *
  //           (equialention(calculateMultiplicationRow(i, j), calculateD(i, j)) -
  //             3 * calculateD(i, j)) *
  //           g[i][j])
  //   ).toFixed(3),
  // );
}
// Сделать подсчёт d

function calculateD(i, j) {
  let result = 1;

  // let oldT = getT();

  let oldValMult = getCountOfMult();
  let oldValDiff = getCountOfDiff();
  let arr = [];

  let differences = [];
  let conjunctions = [];
  let multiplications = [];

  for (let index = 0; index < mInput.value; index++) {
    // Сделать как вектор
    // let el = result.pop();
    // if (result.length) {
    conjunctions.push(conjunction(a[i][index], b[index][j]));
    // result = multiplication(result, difference(1, conjunction(a[i][index], b[index][j])));
    // arr.push(result);
    // } else {
    // result = multiplication(1, difference(1, conjunction(a[i][index], b[index][j])));
    // }
    // arr.push(result);
    // result = multiplication(result.pop(), difference(1, conjunction(a[i][index], b[index][j])));
  }
  for (let index = 0; index < mInput.value; index++) {
    differences.push(difference(1, conjunctions[index]));
  }
  for (let index = 0; index < mInput.value; index++) {
    multiplications.push(multiplication(1, differences[index]));
  }
  console.log(multiplications);
  result = multiplications.reduce((multipl, el) => el * multipl, 1);
  let res = Number(difference(1, result).toFixed(3));

  Tn += Math.ceil((getCountOfMult() + getCountOfDiff() - oldValDiff - oldValMult) / nInput.value);
  globalState.d += 1;

  // Tn += Math.floor((getT() - oldT) / nInput.value);
  if ((i == 0) & (j == 0)) console.log(res, 'DD');
  return res;
}

function calculateCMattrix(valueAccosiations) {
  let C = [];
  for (let i = 0; i < valueAccosiations.i; i++) {
    let row = [];
    for (let j = 0; j < valueAccosiations.j; j++) {
      row.push(calculateCEl(i, j));
    }
    C.push(row);
  }
  return C;
}

function getT() {
  return (
    countOfSum * Number(sumInput.value) +
    countOfMult * Number(multInput.value) +
    countOfDiff * Number(diffInput.value) +
    countOfDiv * Number(divInput.value)
  );
}

function getCountOfSum() {
  return countOfSum * Number(sumInput.value);
}

function getCountOfMult() {
  return countOfMult * Number(multInput.value);
}

function getCountOfDiff() {
  return countOfDiff * Number(diffInput.value);
}

function start() {
  Tn = 0;
  const inputs = document.getElementsByClassName('input');
  errorWrapperRef.innerHTML = '';
  for (let input of inputs) {
    if (!Number(input.value) && input.value !== '0') {
      throw new createErrorException('Введено значение не являющееся числом');
    } else if (Number(input.value) <= 0) {
      throw new createErrorException('Введите число большее 0');
    }
  }

  let C = [];
  countOfSum = 0;
  countOfMult = 0;
  countOfDiv = 0;
  countOfDiff = 0;
  console.log(pInput === p, m, q);
  a = fillMattrix(p.value, m.value);
  b = fillMattrix(m.value, q.value);
  e = fillMattrix(1, m.value);
  g = fillMattrix(p.value, q.value);

  const valueAccosiations = {
    k: mInput.value,
    i: pInput.value,
    j: qInput.value,
  };

  clearTables();
  tableAWrapper.appendChild(createTable(a));
  tableBWrapper.appendChild(createTable(b));
  tableEWrapper.appendChild(createTable(e));
  tableGWrapper.appendChild(createTable(g));
  showLabels();

  C = calculateCMattrix(valueAccosiations);

  tableCWrapper.appendChild(createTable(C));
  //p.value * q.value * m.value;
  console.log(p.value * m.value + m.value * q.value + +m.value + p.value * q.value, 'DSADADSA');
  const r = Math.floor(p.value * m.value + m.value * q.value + +m.value + p.value * q.value);

  T1 =
    countOfSum * Number(sumInput.value) +
    countOfMult * Number(multInput.value) +
    countOfDiff * Number(diffInput.value) +
    countOfDiv * Number(divInput.value);

  const Ky = (T1 / Tn).toFixed(3);
  const eEl = (Ky / nInput.value).toFixed(3);
  let Lsum = sumInput.value * multInput.value * diffInput.value * divInput.value;
  let Lavg =
    (2 * countOfSum * sumInput.value +
      2 * countOfMult * multInput.value +
      2 * countOfDiff * diffInput.value +
      2 * countOfDiv * divInput.value) /
    r;
  const D = (Tn / Lavg).toFixed(3);
  console.log(countOfSum, countOfMult, countOfDiff);
  t1Span.innerHTML = T1;
  tnSpan.innerHTML = Tn;
  rSpan.innerHTML = r;
  kySpan.innerHTML = Ky;
  eSpan.innerHTML = eEl;
  dSpan.innerHTML = D;

  console.log(globalState, 'GLOBAL STATE');

  return {
    t1: T1,
    tn: Tn,
    r: r,
    ky: Ky,
    eEl,
    d: D,
  };
}

// function runForGraphs(p, m, q, n, sum = 1, mult = 1, diff = 1) {
//   sumInput.value = sum;
//   multInput.value = mult;
//   diffInput.value = diff;
//   divInput.value = 1;
//   Tn = 0;
//   nInput.value = n;
//   let C = [];
//   countOfSum = 0;
//   countOfMult = 0;
//   countOfDiv = 0;
//   countOfDiff = 0;
//   a = fillMattrix(p, m);
//   b = fillMattrix(m, q);
//   e = fillMattrix(1, m);
//   g = fillMattrix(p, q);
//   const valueAccosiations = {
//     k: m,
//     i: p,
//     j: q,
//   };

//   C = calculateCMattrix(valueAccosiations);

//   // tableCWrapper.appendChild(createTable(C));
//   //p.value * q.value * m.value;
//   const r = Math.floor(p * m + m * q + +m + p * q);

//   T1 = countOfSum * 1 + +countOfMult * 1 + countOfDiff * 1 + countOfDiv;

//   const Ky = (T1 / Tn).toFixed(3);
//   const eEl = (Ky / nInput.value).toFixed(3);
//   let Lsum = 1;
//   let Lavg = (2 * countOfSum + 2 * countOfMult + 2 * countOfDiff + 2 * countOfDiv) / r;
//   const D = (Tn / Lavg).toFixed(3);

//   return {
//     t1: T1,
//     tn: Tn,
//     r: r,
//     ky: Ky,
//     eEl,
//     d: D,
//   };
// }

function runForGraphs(p, m, q, n) {
  sumInput.value = 1;
  multInput.value = 1;
  diffInput.value = 1;
  Tn = 0;

  pInput.value = p;
  mInput.value = m;
  qInput.value = q;

  let C = [];
  countOfSum = 0;
  countOfMult = 0;
  countOfDiv = 0;
  countOfDiff = 0;

  nInput.value = n;

  console.log(pInput === p, m, q);
  a = fillMattrix(p, m);
  b = fillMattrix(m, q);
  e = fillMattrix(1, m);
  g = fillMattrix(p, q);

  const valueAccosiations = {
    k: m,
    i: p,
    j: q,
  };

  C = calculateCMattrix(valueAccosiations);

  //p.value * q.value * m.value;
  const r = Math.floor(p * m + m * q + +m + p * q);

  T1 = countOfSum + countOfMult + countOfDiff + countOfDiv;

  const Ky = (T1 / Tn).toFixed(3);
  const eEl = (Ky / nInput.value).toFixed(3);
  let Lsum = sumInput.value * multInput.value * diffInput.value * divInput.value;
  let Lavg =
    (2 * countOfSum * sumInput.value +
      2 * countOfMult * multInput.value +
      2 * countOfDiff * diffInput.value +
      2 * countOfDiv * divInput.value) /
    r;
  const D = (Tn / Lavg).toFixed(3);
  console.log(countOfSum, countOfMult, countOfDiff);
  t1Span.innerHTML = T1;
  tnSpan.innerHTML = Tn;
  rSpan.innerHTML = r;
  kySpan.innerHTML = Ky;
  eSpan.innerHTML = eEl;
  dSpan.innerHTML = D;

  return {
    t1: T1,
    tn: Tn,
    r: r,
    ky: Ky,
    eEl,
    d: D,
  };
}

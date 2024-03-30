/*
Лабораторная работа №2 по дисциплине МРЗВИС
Выполнена студентами группы 121702 БГУИР Летко Александр, Пилат Максим
Вариант 3: Вычисление матрицы значений C. 
1. (~) = x*y, /~\ = x*y, x~>y = 1+x*(y-1)
*/
const pInput = document.getElementById('p');
const qInput = document.getElementById('q');
const mInput = document.getElementById('m');
const nInput = document.getElementById('n');

const sumInput = document.getElementById('sum');
const diffInput = document.getElementById('diff');
const multInput = document.getElementById('mult');
const divInput = document.getElementById('div');

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
  Tn += Math.floor((7 * multInput.value + 2 * sumInput.value + 3 * diffInput.value) / nInput.value);

  let twoE0kMinus1 = difference(multiplication(2, e[0][k]), 1);
  let firstMultiplication = multiplication(
    multiplication(implication(a[i][k], b[k][j]), twoE0kMinus1),
    e[0][k],
  );

  let fourImplMinus2 = difference(multiplication(4, implication(a[i][k], b[k][j])), 2);
  let secondBracket = sum(1, multiplication(fourImplMinus2, e[0][k]));

  return Number(
    sum(
      firstMultiplication,
      multiplication(
        multiplication(implication(b[k][j], a[i][k]), secondBracket),
        difference(1, e[0][k]),
      ),
    ).toFixed(3),
  );
  // return Number(
  //   (
  //     implication(a[i][k], b[k][j]) * (2 * e[0][k] - 1) * e[0][k] +
  //     implication(b[k][j], a[i][k]) *
  //       (1 + (4 * implication(a[i][k], b[k][j]) - 2) * e[0][k]) *
  //       (1 - e[0][k])
  //   ).toFixed(3),
  // );
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
  for (let index = 0; index < mInput.value; index++) {
    result = multiplication(result, calculateF(i, j, index));
  }
  Tn += Math.floor(((mInput.value - 1) * multInput.value) / nInput.value);
  return Number(result.toFixed(3));
}

function calculateCEl(i, j) {
  // countOfSum += 2;
  // countOfMult += 7;
  // countOfDiff += 3;
  Tn += Math.floor((7 * multInput.value + 2 * sumInput.value + 3 * diffInput.value) / nInput.value);

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

  return Number(sum(firstMultiplicationBracket, secondPart).toFixed(3));

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
  // countOfDiff += mInput.value - 1;
  // countOfMult += mInput.value - 1;
  for (let index = 0; index < mInput.value; index++) {
    result = multiplication(result, difference(1, conjunction(a[i][index], b[index][j])));
    // result *= 1 - conjunction(a[i][index], b[index][j]);
  }
  // countOfDiff += 1;
  Tn += Math.floor(
    ((mInput.value - 1) * diffInput.value +
      (mInput.value - 1) * multInput.value +
      diffInput.value) /
      nInput.value,
  );
  return Number(difference(1, result).toFixed(3));
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

function start() {
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

  const r = p.value * q.value * m.value;

  console.log(countOfSum);
  console.log(countOfMult);

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
  console.log(Lsum, Lavg);
  const D = (Tn / Lavg).toFixed(3);

  t1Span.innerHTML = T1;
  tnSpan.innerHTML = Tn;
  rSpan.innerHTML = r;
  kySpan.innerHTML = Ky;
  eSpan.innerHTML = eEl;
  dSpan.innerHTML = D;
}

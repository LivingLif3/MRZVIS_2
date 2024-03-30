const errorWrapperRef = document.getElementById('errors');

const tableAWrapper = document.getElementById('tableAWrapper');
const tableBWrapper = document.getElementById('tableBWrapper');
const tableEWrapper = document.getElementById('tableEWrapper');
const tableGWrapper = document.getElementById('tableGWrapper');
const tableCWrapper = document.getElementById('tableCWrapper');

const t1Span = document.getElementById('t1');
const tnSpan = document.getElementById('tn');
const rSpan = document.getElementById('r');
const kySpan = document.getElementById('ky');
const eSpan = document.getElementById('e');
const dSpan = document.getElementById('d');

function createTable(mattrix) {
  const table = document.createElement('table');
  table.setAttribute('class', 'table');
  for (let row of mattrix) {
    const tableRow = document.createElement('tr');
    for (let item of row) {
      const tableItem = document.createElement('td');
      tableItem.innerHTML = item;

      tableRow.appendChild(tableItem);
    }
    table.appendChild(tableRow);
  }

  return table;
}

function createErrorException(message) {
  errorWrapperRef.innerHTML = message;
}

function showLabels() {
  const labels = document.getElementsByClassName('label');
  for (let label of labels) {
    label.style.display = 'inline';
  }
}

function clearTables() {
  tableAWrapper.innerHTML = '';
  tableBWrapper.innerHTML = '';
  tableEWrapper.innerHTML = '';
  tableGWrapper.innerHTML = '';
  tableCWrapper.innerHTML = '';
}

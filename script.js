const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-Millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// fetch random user and add money
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }
    addData(newUser);
}

// Double money 
// ... is a spread operator that allows js functions to treat an array as separate arguments
// https://medium.com/coding-at-dawn/how-to-use-the-spread-operator-in-javascript-b9e4a8b06fab
function doubleMoney() {
    data = data.map((user) => {
        return { ...user, money: user.money * 2 }
    });
    updateDOM();
}

function addData(obj) {
    data.push(obj);

    updateDOM();
}

// sort by richest person
function sortByRichest() {
    data = data.sort((a , b) => b.money - a.money);
    updateDOM();
}
//updateDOM
function updateDOM(providedData = data) {
// clear main div
main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

providedData.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
    main.appendChild(element);
});
}

// Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }

  // Event listeners
  addUserBtn.addEventListener('click', getRandomUser);
  doubleBtn.addEventListener('click', doubleMoney);
  sortBtn.addEventListener('click', sortByRichest);
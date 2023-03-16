const user = localStorage.getItem('loggedInUser');
const greetingElement = document.querySelector('.greeting span');
const formInputs = {
  name: document.querySelector('#name'),
  age: document.querySelector('#age'),
  email: document.querySelector('#email'),
};

const addButton = document.querySelector('.add-button');
addButton.addEventListener('click', addItem);

if (user) {
  greetingElement.textContent = `Hello, ${JSON.parse(user).firstname}!`;
}

const users = [
  { name: 'John Doe', age: 28, email: 'john@gmail.com' },
  { name: 'Jane', age: 23, email: 'jane@gmail.com' },
  { name: 'Joel', age: 55, email: 'joel@badass.com' },
  { name: 'Ellie', age: 16, email: 'ellie@kampak.com' },
];

function renderData(users) {
  const tableBody = document.querySelector('table tbody');
  tableBody.innerHTML = '';

  for (const [index, user] of users.entries()) {
    const tableRow = document.createElement('tr');

    for (const key in user) {
      const tableData = document.createElement('td');
      tableData.textContent = user[key];
      tableRow.appendChild(tableData);
    }

    const tableData = document.createElement('td');

    ['Edit', 'Delete'].forEach(btnText => {
      const button = document.createElement('button');
      button.textContent = btnText;
      button.classList.add('entry-button');

      if (btnText === 'Edit') {
        button.addEventListener('click', editItem(index));
      } else {
        button.addEventListener('click', deleteItem(index));
      }

      tableData.appendChild(button);
      tableRow.appendChild(tableData);
    });

    tableBody.appendChild(tableRow);
  }
}

function addItem() {
  users.push({
    name: formInputs.name.value,
    age: formInputs.age.value,
    email: formInputs.email.value,
  });

  clearInputValues(formInputs);
  renderData(users);
}

function editItem(index) {
  return () => {
    var name = prompt('Nama baru:', users[index].name);
    var age = prompt('Umur baru:', users[index].age);
    var email = prompt('Email baru:', users[index].email);

    users[index] = { name, age, email };

    renderData(users);
  };
}

function deleteItem(index) {
  return () => {
    users.splice(index, 1);
    renderData(users);
  };
}

function clearInputValues(formInputs) {
  for (const key in formInputs) {
    formInputs[key].value = '';
  }
}

renderData(users);

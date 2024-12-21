const express = require('express');

const app = express();
const port = 3000;

let person = {
  firstName: 'Rajashree',
  lastName: 'Pradhan',
  gender: 'female',
  age: 27,
  isMember: true,
};

app.get('/person', (req, res) => {
  res.json(person);
});

function getFullName(person) {
  return person.firstName + ' ' + person.lastName;
}

app.get('/person/fullName', (req, res) => {
  //let fullName = getFullName(person);
  res.json({ fullName: person.firstName + ' ' + person.lastName });
});

function getNameGender(person) {
  let newObject = {
    firstName: person.firstName,
    gender: person.gender,
  };

  return newObject;
}

app.get('/person/firstname-gender', (req, res) => {
  let firstnameAndGender = getNameGender(person);
  res.json(firstnameAndGender);
});

function incrementedAge(person) {
  person.age = person.age + 1;
  return person;
}

app.get('/person/increment-age', (req, res) => {
  res.json(incrementedAge(person));
});

function getDetails(person) {
  let newObject = {
    fullName: getFullName(person),
    isMember: person.isMember,
  };
  return newObject;
}

app.get('/person/fullname-membership', (req, res) => {
  res.json(getDetails(person));
});

function calcDiscount(person, cart_total) {
  let finalPrice;
  if (person.isMember) {
    finalPrice = cart_total - 0.1 * cart_total;
  } else {
    finalPrice = cart_total;
  }
  return finalPrice;
}

app.get('/person/final-price', (req, res) => {
  let cart_total = parseFloat(req.query.cartTotal);
  res.json({ finalPrice: calcDiscount(person, cart_total) });
});

function getShippingCost(cartTotal, isMember) {
  let finalShippingCost;
  if (cartTotal > 500 && isMember) {
    finalShippingCost = 0;
  } else {
    finalShippingCost = 99;
  }
  return finalShippingCost;
}

app.get('/person/shipping-cost', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let shippingCost = getShippingCost(cartTotal, person.isMember);
  res.json({ shippingCost: shippingCost.toFixed(2) });
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

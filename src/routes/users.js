const express = require('express');
const usersOriginal = require('../data/users');
const { check, validationResult } = require('express-validator/check');

let usersCopy = [ ...usersOriginal ];
let userCount = usersCopy.length;

const router = express.Router();

// Reduce duplicates by property in hero array
Reduce = (Arr, prop) => {

  var heroList = Arr
    // Make a list of hero names
    .map(e => e[prop])
    // Delete duplicate names
    .filter((item, index, arr) =>  arr.indexOf(item) == index)

  // Map new objects from updated hero list
  const newArr = heroList.map((item, index, arr) => {
    let obj = {
      id: '',
      first_name: '',
      last_name: '',
      hero_name: item,
      favorite_food: []
    }
    for(let i = 0; i < Arr.length; i++) {
      if(item === Arr[i].hero_name) {
        obj.first_name = Arr[i].first_name;
        obj.last_name = Arr[i].last_name;
        obj.id = Arr[i].id;
        if(Arr[i].favorite_food !== '') {
          obj.favorite_food.push({id: Arr[i].id , food: Arr[i].favorite_food})
        } else {
          obj.favorite_food.splice()
        };
      }
    }
    return obj
  })
 return newArr;
}

router.delete('/food', [
  check('id').exists()
], (req, res) => {
  try {
    validationResult(req).throw();
    for(let i = 0; i < usersCopy.length; i++) {
      if(usersCopy[i].id === JSON.parse(req.query.id)) {
        usersCopy.splice(i, 1);
      }
    }
    res.send({
      success: true
    })
  } catch(err) {
    res.status(422).send(err.toString());
  }
});

router.get('/foods', (req, res) => {
  // Remove Duplicates and sort
  const reduced = Reduce(usersCopy.sort((a, b) => a.id - b.id), 'hero_name')
  res.send(reduced);
});

router.post('/food', [
  check('hero_name').exists(),
  check('first_name').exists(),
  check('last_name').exists()
],(req, res) => {
  try {
    validationResult(req).throw();
    userCount += 1;
    usersCopy.push({
      id: userCount,
      ...req.body
    })
    res.json({
      success: userCount
    })
  } catch (err) {
    res.status(422).send(err.toString());
  }
});

module.exports = router
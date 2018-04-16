const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index', { title: 'camden | design'});
});

router.get('/projects', (req, res, next) => {
  res.render('projects', { title: 'camden | projects'});
});

router.get('/about', (req, res, next) => {
  res.render('about', { title: 'camden | about'});
});

module.exports = router;
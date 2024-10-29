var express = require('express');
var router = express.Router();
const { composerService } = require('../model');

/*
  Can test this route from a second terminal using
  node -e "http.get('http://localhost:3000/', (res) => res.setEncoding('utf8').once('data', console.log))"
*/
router.get('/', async function(req, res, next) {
  try{
    const composers = await composerService.getAllComposers();
    res.json(composers);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

/*
  Can test this route from a second terminal using
  node -e "http.get('http://localhost:3000/api/composers', (res) => res.setEncoding('utf8').once('data', console.log))"
*/
router.get('/api/composers', async function(req, res, next) {
  try{
    const composers = await composerService.getAllComposers();
    res.json(composers);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;

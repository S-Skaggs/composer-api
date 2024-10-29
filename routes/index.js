var express = require('express');
var router = express.Router();
const { composerService } = require('../model');
const createError = require('http-errors');

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

/*
  Can test this route from a second terminal using
  node -e "http.get('http://localhost:3000/1', (res) => res.setEncoding('utf8').once('data', console.log))"
*/
router.get('/:id', async function(req, res, next) {
  try{
    const composer = await composerService.getComposerById(req.params.id);
    res.json(composer);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

/*
  Can test this route from a second terminal using
  node -e "http.get('http://localhost:3000/api/composers/1', (res) => res.setEncoding('utf8').once('data', console.log))"
*/
router.get('/api/composers/:id', async function(req, res, next) {
  try{
    const composer = await composerService.getComposerById(req.params.id);
    res.json(composer);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

/*
  Can test this route from a second terminal using
  Update a composer
  node -e "http.request('http://localhost:3000/1', {method:'put', headers:{'content-type': 'application/json'}}, (res) => console.log(res.statusCode)).end(JSON.stringify({data: { firstName:'updated firstName', lastName:'updated LastName', genre:'updated Genre' }}))"
  Read that composer
  node -e "http.get('http://localhost:3000/1', (res) => res.setEncoding('utf8').once('data', console.log))"
  Composer does not exist
  node -e "http.request('http://localhost:3000/100', {method:'put', headers:{'content-type': 'application/json'}}, (res) => console.log(res.statusCode)).end(JSON.stringify({data: { firstName:'updated firstName', lastName:'updated LastName', genre:'updated Genre' }}))"
*/
router.put('/:id', async function(req, res, next) {
  try{
    const id = await composerService.modifyComposer(req.params.id, req.body);
    res.json({ id });
  } catch (err) {
    console.error(err);
    if(err.message === 'Composer not found in the database') {
      return next(createError(404, err.message));
    }
    next(err);
  }
});

/*
  Can test this route from a second terminal using
  node -e "http.request('http://localhost:3000/api/composer/1', {method:'put', headers:{'content-type': 'application/json'}}, (res) => console.log(res.statusCode)).end(JSON.stringify({data: { firstName:'updated firstName', lastName:'updated LastName', genre:'updated Genre' }}))"
  node -e "http.request('http://localhost:3000/api/composer/foo', {method:'put', headers:{'content-type': 'application/json'}}, (res) => console.log(res.statusCode)).end(JSON.stringify({data: { firstName:'updated firstName', lastName:'updated LastName', genre:'updated Genre' }}))"
*/
router.put('/api/composer/:id', async function(req, res, next) {
  try{
    const id = await composerService.modifyComposer(req.params.id, req.body);
    res.json({ id });
  } catch (err) {
    console.error(err);
    if(err.message === 'Composer not found in the database') {
      return next(createError(404, err.message));
    }
    next(err);
  }
});

module.exports = router;

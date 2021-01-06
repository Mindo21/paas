const express = require('express');
const bodyParser = require('body-parser');
const api = express.Router();
module.exports = api;

// i used the inmemory database model first,
// to check that everything is working on my side

// const db = require(`./db-inmemory`);
const db = require(`./db-datastore`);

api.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

// GET - returns value as a string
api.get('/:id(\\w+)', async (req, res) => {
  try {
    res.send(await db.get(req.params.id));
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

// PUT - returns value as a string
api.put('/:id(\\w+)', bodyParser.text(), async (req, res) => {
  try {
    res.send(await db.put(req.params.id, req.body));
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

// POST - returns value as a string
api.post('/:id(\\w+)', bodyParser.text(), async (req, res) => {
  try {
    res.send(await db.post(req.params.id, req.body));
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

// DELETE - returns status code only
api.delete('/:id(\\w+)', async (req, res) => {
  try {
    await db.delete(req.params.id);
    res.sendStatus(204);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});
const express = require('express');
const bodyParser = require('body-parser');
const api = express.Router();
module.exports = api;

const db = require(`./db-datastore`);
// const db = require(`./db-inmemory`);

api.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

api.get('/', async (req, res) => {
  try {
    res.json(await db.list());
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

api.get('/:id(\\w+)', async (req, res) => {
  try {
    res.send(await db.get(req.params.id));
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

api.put('/:id(\\w+)', bodyParser.text(), async (req, res) => {
  try {
    res.send(await db.put(req.params.id, req.body));
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

api.post('/:id(\\w+)', bodyParser.text(), async (req, res) => {
  try {
    res.send(await db.post(req.params.id, req.body));
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

api.delete('/:id(\\w+)', async (req, res) => {
  try {
    await db.delete(req.params.id);
    res.sendStatus(204);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});
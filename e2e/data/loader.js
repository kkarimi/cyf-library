/* eslint-disable no-console */
const MongoClient = require('mongodb').MongoClient
const fs = require('fs')

function readJsonFile(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf8', (err, content) => {
      if (err) {
        reject(err)
      }
      else {
        resolve(JSON.parse(content))
      }
    })
  })
}

function mongo() {
  return MongoClient
    .connect('mongodb://localhost:27017')
    .then(client => client.db('library'))
}

function clear(db) {
  return db.collections().then(collections => {
    return Promise.all(collections.map(collection => db.collection(collection.s.name).drop()))
  })
}

function seed(db, seedFile) {
  return readJsonFile(seedFile)
    .then(content => Object.keys(content).map(collection => db.collection(collection).insertMany(content[collection])))
    .then(promises => Promise.all(promises))
}

function databaseAction(func, ...args) {
  return (db) => func(db, ...args).then(() => db)
}

mongo()
  .then(databaseAction(clear))
  .then(databaseAction(seed, process.argv[2]))
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err)
    process.exit(1)
  })

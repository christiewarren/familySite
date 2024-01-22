
const csv = require('csv-parser')
const fs = require('fs')
const results = [];
let resultsJSON = []
const peopleCSVFile = './data/peopleSheetData.csv'
const peopleJSONFile = './data/peopleData.json'

fs.createReadStream(peopleCSVFile)
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {

    resultsJSON = JSON.stringify(results)

    fs.writeFile(peopleJSONFile, resultsJSON, err => {
        if (err) {
          console.error(err);
        }
      })
  });

  //to run in terminal: node {path to this file e.g. ./data/imageDataScript.js}
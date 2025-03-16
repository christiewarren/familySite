
const csv = require('csv-parser')
const fs = require('fs')
const results = [];
let resultsJSON = []
const imagesCSVFile = './data/sheetData.csv'
const imagesJSONFile = './data/imageData.json'

fs.createReadStream(imagesCSVFile)
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    // console.log(results);

    resultsJSON = JSON.stringify(results)

    fs.writeFile(imagesJSONFile, resultsJSON, err => {
        if (err) {
          console.error(err);
        }
      })
  });

  //to run in terminal: node {path to this file e.g. ./data/imageDataScript.js}
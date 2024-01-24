
const csv = require('csv-parser')
const fs = require('fs')
const results = [];
let resultsJSON = []
const peopleCSVFile = './data/peopleSheetData.csv'
const peopleJSONFile = './data/peopleData.json'

fs.createReadStream(peopleCSVFile)
  .pipe(csv())
  .on('data', (data) => {

    //run parseArray with parents, siblings and children (will find better way to do this)
    data.parents = parseArray(data.parents)
    data.siblings = parseArray(data.siblings)
    data.children = parseArray(data.children)

    results.push(data)
  })
  .on('end', () => {

    resultsJSON = JSON.stringify(results, null, 2)

    fs.writeFile(peopleJSONFile, resultsJSON, err => {
        if (err) {
          console.error(err);
        }
      })
  });

  //for the given string (parents, siblings, or children), set equal to itself split at ", " (an array). if the first index of the resulting array is null, return an empty array

  function parseArray(array){
    array = array.split(", ")
    if(array[0]){
      return array
    }return []
  }

  //to run in terminal: node {path to this file e.g. ./data/imageDataScript.js}
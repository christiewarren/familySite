
const csv = require('csv-parser')
const fs = require('fs')
const results = [];
let resultsJSON = []
const imagesCSVFile = './data/imageSheetData.csv'
const imagesJSONFile = './data/imageData.json'

fs.createReadStream(imagesCSVFile)
  .pipe(csv())
  .on('data', (data) => {

    //run parseArray with people and place (prob better way to do this)
    data.people = parseArray(data.people)
    data.place = parseArray(data.place)

    results.push(data)
  })
  .on('end', () => {

    resultsJSON = JSON.stringify(results, null, 2)

    fs.writeFile(imagesJSONFile, resultsJSON, err => {
        if (err) {
          console.error(err);
        }
      })
  });

  //for the given string (people or place), set equal to itself split at ", " (an array). if the first index of the resulting array is null, return an empty array
  function parseArray(array){
    array = array.split(", ")
    if(array[0]){
      return array
    }return []
  }

  //to run in terminal: node {path to this file e.g. ./data/imageDataScript.js}
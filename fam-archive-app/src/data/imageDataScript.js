
const csv = require('csv-parser')
const fs = require('fs')
const results = [];
let resultsJSON = []
const imagesCSVFile = './fam-archive-app/src/data/sheetData.csv'
const imagesJSONFile = './fam-archive-app/src/data/imageData.json'

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

  
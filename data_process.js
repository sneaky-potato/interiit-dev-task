const data = require('./saved_links.json');
const fs = require('fs');
const cheerio = require("cheerio");
const axios = require("axios");

let modifiedData = []

let countDown = data.links.length;

data.links.forEach((url, index) => {
    modifiedData[index] = {};
    modifiedData[index].id = index+1;
    modifiedData[index].url = url;

    getTitle(url, title => {
    modifiedData[index].title = title;
    if (--countDown === 0) { // Callback for ALL starts on next line.
        console.log("result =>", modifiedData);
        jsonContent = JSON.stringify(modifiedData);
        fs.writeFile("data.json", jsonContent, function(err) {
            if (err) {
                console.log(err);
            }
        });
    }
  });
});

function getTitle (url, callback) {
  console.log('Starting fetch for "' + url + '".');
  axios.get(url, { 
    headers: { "Accept-Encoding": "gzip,deflate,compress" } 
})
   .then(response => response.data)
   .then(responseBody => {
        const $ = cheerio.load(responseBody);
        const title = $("title");
        console.log('... fetch for ' + url + ' completed!');
        callback(title.text());
  }).catch(err => {
    // console.log(err);
    callback('Page not found');
  });
}


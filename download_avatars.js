//Declaring var's
var request = require('request');
var token = require('./secrets');
var http = require('http');
var fs = require('fs');
var owner = process.argv[2];
var name = process.argv[3];

console.log('Welcome to the GitHub Avatar Downloader!');

//Download avatars by URL (URL and filePath to save it).
function downloadImageByURL(url, filePath) {
//sending request
  return request.get(url)
         .on('error', function (err) {
           if(err) {
            //throw error if has any.
             throw err;
           }
         })
         .on('response', function (response){
           console.log('Response status code: ', response.statusCode);
          //verifying status code 200 OK
           console.log('Downloading avatar!');
         })
        //copying and saving avatar
        .pipe(fs.createWriteStream(filePath));
}
//identifying all repositor contributors.
function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': "token " + token.GITHUB_TOKEN
    },
    json: true
  };
    //downloading each avatar
  request(options, function(err, res, body) {
    body.forEach((item) => {
      downloadImageByURL(item.avatar_url, `./avatars/${item.login}.jpg`);
    });
  });
}
//executing function
getRepoContributors(owner, name, function(err, result) {
  console.log("Errors:", err);
  console.log(JSON.stringify(result, null, 2));
});

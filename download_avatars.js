var request = require('request');
var token = require('./secrets');
var http = require('http');
var fs = require('fs');
var owner = process.argv[2];
var name = process.argv[3];

console.log('Welcome to the GitHub Avatar Downloader!');
function downloadImageByURL(url, filePath) {
  return request.get(url)
         .on('error', function (err) {
           if(err) {
             throw err;
           }
         })
         .on('response', function (response){
           console.log('Response status code: ', response.statusCode);
           console.log('Downloading avatar!');
         })
        .pipe(fs.createWriteStream(filePath));
}

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': "token " + token.GITHUB_TOKEN
    },
    json: true
  };
    
  request(options, function(err, res, body) {
    body.forEach((item) => {
      downloadImageByURL(item.avatar_url, `./avatars/${item.login}.jpg`);
    });
  });
}
getRepoContributors(owner, name, function(err, result) {
  console.log("Errors:", err);
  console.log(JSON.stringify(result, null, 2));
});


//downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg");
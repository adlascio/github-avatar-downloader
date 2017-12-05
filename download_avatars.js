var request = require('request');
var token = require('./secrets');
var http = require('http');

console.log('Welcome to the GitHub Avatar Downloader!');

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
      console.log(item.avatar_url);
      cb(err, body);
    });
  });
}
getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log(JSON.stringify(result, null, 2));
});

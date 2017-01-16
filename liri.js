//set variable 

var action = process.argv[2];
var title = '';

//If this's no movie, return Mr. Nobody
if (action === 'movie-this' && process.argv[3] === undefined) {
  title = 'Mr. Nobody';
}
//If there is no song, return the sign
if (action === 'spotify-this-song' && process.argv[3] === undefined) {
  title = 'The Sign';
}

//for loop to account for spacing in title
for (var i = 3; i < process.argv.length; i++) {
  if (i > 3 && i < process.argv.length) {
    title = title + "+" + process.argv[i];
  }
  else {
    title += process.argv[3];
  }
}

//If statements to check action
if (action === 'my-tweet') {
	tweet();
};

if (action === 'spotify-this-song') {
	spotify();
};

if (action === 'movie-this') {
	movie();
};

if (action === 'do-what-it-says') {
	random();
};

//functions

function tweet() {
	var Twitter = require('twitter');	
	var keys = require("./key.js");  
	//set variables from the keys
  var consumer_key = keys.twitterKeys.consumer_key;
  var consumer_secret = keys.twitterKeys.consumer_secret;
  var access_token_key = keys.twitterKeys.access_token_key;
  var access_token_secret = keys.twitterKeys.access_token_secret;

 //Must figure out how to set keys into these variables
var client = new Twitter({
  consumer_key: consumer_key,
  consumer_secret: consumer_secret,
  access_token_key: access_token_key,
  access_token_secret: access_token_secret
});
//parameters for the search 
var params = {screen_name: 'NinjaPanda47', count: 20};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for (i=0; i<tweets.length; i++){
      console.log("");
      console.log(tweets[i].created_at);
      console.log(tweets[i].text);
      console.log("--------------------------");
    }
  }
});

}


function movie() {

  queryUrl= "http://www.omdbapi.com/?t=" + title + "&plot=short&r=json";

  var request = require('request');

  request(queryUrl, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(JSON.parse(body));}
  });

}


function spotify() {
  var spotify = require('spotify');
spotify.search({type: 'track', query: title}, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
    else {
      // Artist(s)
      // The song's name
      // A preview link of the song from Spotify
      // The album that the song is from
    for (i=0; i<data.tracks.items.length; i++){
    console.log('');
    console.log("Artist Name: " + data.tracks.items[i].artists[0].name);
    console.log("Track Name: " + data.tracks.items[i].name);
    console.log("Album Name: " + data.tracks.items[i].album.name);
    console.log("Preview Link: " + data.tracks.items[i].preview_url);
    }
    }

});

}

function random() {
  // fs is an NPM package for reading and writing files
var fs = require("fs");

// This block of code will read from the "movies.txt" file.
// It's important to include the "utf8" parameter or the code will provide stream data (garbage)
// The code will store the contents of the reading inside the variable "data"
fs.readFile("random.txt", "utf8", function(error, data) {

  // Then split it by commas (to make it more readable)
  var output = data.split(",");

  //set variables accordingly
  action = output[0];
  title = output[1];
    if (action === 'spotify-this-song'){
      spotify();
    }
    if (action === 'my-tweet'){
      tweet();
    }
    if (action === 'movie-this'){
      movie();
    }

});
}


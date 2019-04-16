// require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);
var Spotify = require('node-spotify-api');
var fs = require("fs");
 
var spotify = new Spotify({
  id: "f30c37e2f18343999af329af165273ac",
  secret: "ee84336188814490b7767ecece971abf"
});

var command = process.argv[2]
var searchTerm = process.argv.slice(3).join(" ")

// console.log("command = " + command)
// console.log("searchTerm = " + searchTerm)
// console.log(process.argv.length)

switch (command){
    case "concert":
        //  console.log("You are searching for a Concert")
         concert()
         break
    case "spotify":
        //  console.log("You are searching for a song on Spotify")
         spotifysearch()
         break
    case "movie":
        // console.log("You are searching for a movie")
        movie()
        break
    case "do-what-it-says":
        dowhat()
        // console.log("You are searching do what is says")
        break
}   

function concert(){
    queryUrl = "https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp"
    // console.log(queryUrl)
    axios
        .get(queryUrl)
        .then(function(response) {
        // console.log(response.data);
        console.log("Venue: " + response.data[0].venue.name)
        console.log("Location: " +response.data[0].venue.city + ", " + response.data[0].venue.region + ", " + response.data[0].venue.country) 
        console.log("Date: " +response.data[0].datetime)
  })
}

function movie(){
    if (process.argv.length === 3){
        console.log("If you haven't watched Mr. Nobody, then you should: <http://www.imdb.com/title/tt0485947/>  It's on Netflix!")
    } 
    else{
    queryUrl = "http://www.omdbapi.com/?t="+ searchTerm+ "&y=&plot=short&apikey=trilogy"
    console.log(queryUrl)
    axios.get(queryUrl).then(
  function(response) {

      console.log("Title: " + response.data.Title)
      console.log("Year: " + response.data.Year)
      console.log("Rating: " + response.data.Rated)
      console.log("Rotten Tomatoes Score: " + response.data.Ratings[1].Value)
      console.log("Country of Origin: " + response.data.Country)
      console.log("Language: " + response.data.Language)
      console.log("Plot: " + + response.data.Plot)
      console.log("Actors: " + response.data.Actors)
    // console.log(response.data);
  })
  }
}

function spotifysearch (){
    spotify.search({ type: 'track', query: searchTerm }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        console.log("Artists: " + data.tracks.items[0].artists[0].name);
        console.log("Name: " + data.tracks.items[0].name);
        console.log("Link: " + data.tracks.items[0].href);
        console.log("Album: " + JSON.stringify(data.tracks.items[0].album.name));
        // console.log(data); 
      });
}

function dowhat (){

    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
          return console.log(error);
        }
        // console.log(data);
        var dataArr = data.split(",");
        // console.log(dataArr);
        searchTerm = dataArr[1]
        // console.log(searchTerm)
        spotifysearch()
      });

}

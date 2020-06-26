'use strict';

// Loads Environment Variables from .env
require('dotenv').config();

// NPM Dependencies
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');

// Dependency usage
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

// API route methods
app.get('/', handleHomePage);
app.get('/location', locationHandler);
app.get('/weather', weatherHandler);
app.get('/trails', hikingHandler);

// Initializes environment
app.listen(PORT, () => console.log('Server is running on port', PORT));


// Memory Cache
let locations = {};

// Home page
function handleHomePage(request, response) {
  response.send('Hello World times two. Initial Route');
}

function locationHandler(request, response) {
  if (locations[request.query.city]){
    response.status(200).send(locations[request.query.city]);
  } else {locationAPIHandler(request.query.city, response);
  }
}


// location API environment
function locationAPIHandler(city, response) {
  // const city = request.query.city;
  const API = 'https://us1.locationiq.com/v1/search.php';

  let queryObject = {
    key: process.env.GEOCODE,
    q: city,
    format: 'json'
  };

  superagent.get(API)
    .query(queryObject)
    .then(data => { 
      let locationData = new Location(data.body[0], city);
      response.status(200).send(locationData);
    })
    .catch( function(){
      response.status(500).send('Something went wrong with Location Data')
    })
}

function Location(obj, city) {
  this.search_query = city;
  this.formatted_query = obj.display_name;
  this.latitude = obj.lat;
  this.longitude = obj.lon;
}


// weather API environment
function weatherHandler(request, response) {
  const API = 'http://api.weatherbit.io/v2.0/history/daily';
  
  let queryObject = {
    lat: request.query.latitude,
    lon: request.query.longitude,
    key: process.env.WEATHER_API_KEY
  };

  superagent.get(API)
  .query(queryObject)
  .then(data => {
    let dailyWeather = data.body.data;
    let dailyForecast = dailyWeather.map((day) => new Weather(day));
    response.status(200).send(dailyForecast);
  })
  .catch( function(){
    response.status(500).send('Something went wrong with Weather Data');
  })
}

function Weather(forecast, time) {
  this.forecast = forecast;
  this.time = new Date(time).toDateString();
}

function hikingHandler(request, response) {
  const API = 'https://www.hikingproject.com/data/get-trails';

  let queryObject = {
    lat: request.query.latitude,
    lon: request.query.longitude,
    key: process.env.TRAIL_API_KEY
  };

  superagent.get(API)
  .query(queryObject)
  .then(data => {
    let hikingData = data.body.trails;
    let 
  })
}

// Trails API environment
function Hiking(obj) {
  this.name = obj.name;
  this.location = obj.location;
  this.length = obj.length;
  this.stars = obj.starts;
  this.star_votes = obj.starVotes;
  this.summary = obj.summary;
  this.trail_url = obj.url;
  this.conditions = obj.conditionDetails;
  this.condition_date = obj.conditionDate;
  this.condition_time = obj.conditionTime;
}



app.use('*', (request, response) => {
  response.status(404).send('You broke something.. Good job.');
});













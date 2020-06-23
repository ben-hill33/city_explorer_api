'use strict';

// dotenv, express, cors
require('dotenv').config();

const express = require('express');
// this creates an instance of express as our "app"
const app = express();

const superagent = require('superagent');

const cors = require('cors');

// .env file renders here
const PORT = process.env.PORT || 3000;



app.use(cors());



// app.get('/location', (request, response) => {
//   let data = require('./data/location.json');
//   console.log(request);
//   let actualData = new Location(data[0], request.query.city);
  
//   response.status(200).json(actualData);
// });

app.get('/location', (request, response) => {
  const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.GEOCODE}&q=${request.query.city}&format=json`;
  superagent.get(API)
    .then(data => {
      console.log(data.body[0]);
      let actualData = new Location(data.body[0], request.query.city);
      
      response.status(200).json(actualData);
    })
    .catch( function(){
      response.status(500).send('Something went wrong with your search selection')
    })
});

app.get('/weather', (request, response) => {
  let weatherData = require('./data/weather.json').data;
  
  let output = [];
  weatherData.forEach(data => {
    let dayObject = new Weather(data.weather.description, data.datetime);
    output.push(dayObject);
  })
  console.log(output);
  response.status(200).json(output)
});


function Location(obj, city) {
  this.search_query = city;
  this.formatted_query = obj.display_name;
  this.latitude = obj.lat;
  this.longitude = obj.lon;

}

function Weather(forecast, time) {
  this.forecast = forecast;
  this.time = new Date(time).toDateString();
  
}

app.use('*', (request, response) => {
  response.status(404).send('You broke something.. Good job.');
});

app.use((error, request, response, next) => {
  console.log(error);
  response.status(500).send('server is broken');
});


app.listen(PORT, () => console.log('Server is running on port', PORT));











'use strict';

// dotenv, express, cors
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { request, response } = require('express');

// look into the what the magic is that John says is magic. 
// .env file stuff show up here
const PORT = process.env.PORT;

// this creates an instance of express as our "app"
const app = express();

app.use(cors());

app.get('/location', (request, response) => {
  //Read the data that came from external API
  let data = require('./data/location.json');
  // Adapt the data to match the contract********
  let actualData = new Location(data[0]);
  // Send out the adapted data
  response.status(200).json(actualData);
});

function Location(obj) {
  this.latitude = obj.lat;
  this.longitude = obj.lon;
  this.formatted_query = obj.display_name;// Where does formatted_query come from???
}

// $('thing').on('something', () => {}) // I don't like how this is named. figure out what this does and rename.
app.get('/restaurants', (request, response) => {
  let data = require('./data/restaurants.json');

  let allRestaurants = []; // stores data in array and loops through contents restaurants object constructor
  data.nearby_restaurants.forEach(restObject => {
    let restaurant = new Restaurant(restObject);
    allRestaurants.push(restaurant);
  });

  response.status(200).json(allRestaurants);
});

function Restaurant(obj) {
  this.restaurant = obj.restaurant.name;
  this.locality = obj.restaurant.location.locality;
  this.cuisines = obj.restaurant.cuisines;
}

app.use('*', (request, response) => {
  response.status(404).send('You broke something.. Good job.');
});

app.use((error, request, response, next) => {
  console.log(error);
  response.status(500).send('server is broken');
});

app.listen( PORT, () => console.log('Server is runnning on port', PORT));











